#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  deploy_ionos_sftp.sh --local-dir <dir> --host <host> --user <user> --remote-dir <dir> [options]

Options:
  --port <port>            SFTP port (default: 22)
  --identity-file <path>   SSH private key file
  --dry-run                Print generated batch and exit
  --help                   Show this help
USAGE
}

LOCAL_DIR=""
HOST=""
USER=""
PORT="22"
REMOTE_DIR=""
IDENTITY_FILE=""
DRY_RUN=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --local-dir)
      LOCAL_DIR="${2:-}"
      shift 2
      ;;
    --host)
      HOST="${2:-}"
      shift 2
      ;;
    --user)
      USER="${2:-}"
      shift 2
      ;;
    --port)
      PORT="${2:-}"
      shift 2
      ;;
    --remote-dir)
      REMOTE_DIR="${2:-}"
      shift 2
      ;;
    --identity-file)
      IDENTITY_FILE="${2:-}"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

if [[ -z "$LOCAL_DIR" || -z "$HOST" || -z "$USER" || -z "$REMOTE_DIR" ]]; then
  echo "Missing required arguments." >&2
  usage >&2
  exit 2
fi

if ! command -v sftp >/dev/null 2>&1; then
  echo "sftp command not found in PATH." >&2
  exit 1
fi

if [[ ! -d "$LOCAL_DIR" ]]; then
  echo "Local directory does not exist: $LOCAL_DIR" >&2
  exit 1
fi

if ! [[ "$PORT" =~ ^[0-9]+$ ]]; then
  echo "Port must be an integer: $PORT" >&2
  exit 1
fi

LOCAL_DIR="$(cd "$LOCAL_DIR" && pwd)"

batch_file="$(mktemp)"
cleanup() {
  rm -f "$batch_file"
}
trap cleanup EXIT

echo "-mkdir $REMOTE_DIR" >> "$batch_file"
while IFS= read -r dir; do
  rel="${dir#"$LOCAL_DIR"/}"
  [[ "$dir" == "$LOCAL_DIR" ]] && continue
  echo "-mkdir $REMOTE_DIR/$rel" >> "$batch_file"
done < <(find "$LOCAL_DIR" -type d | sort)

while IFS= read -r file; do
  rel="${file#"$LOCAL_DIR"/}"
  echo "put $file $REMOTE_DIR/$rel" >> "$batch_file"
done < <(find "$LOCAL_DIR" -type f | sort)

if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "[dry-run] generated sftp batch file:"
  cat "$batch_file"
  exit 0
fi

sftp_cmd=(sftp -P "$PORT" -o BatchMode=no -b "$batch_file")
if [[ -n "$IDENTITY_FILE" ]]; then
  sftp_cmd+=( -i "$IDENTITY_FILE" )
fi
sftp_cmd+=( "$USER@$HOST" )

"${sftp_cmd[@]}"

echo "Deployment completed: $LOCAL_DIR -> $USER@$HOST:$REMOTE_DIR"
