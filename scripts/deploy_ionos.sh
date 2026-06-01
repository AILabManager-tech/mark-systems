#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$ROOT_DIR/deploy/ionos.env"

if [[ -f "$ENV_FILE" ]]; then
  # shellcheck disable=SC1090
  source "$ENV_FILE"
fi

required=(IONOS_HOST IONOS_USER IONOS_PORT IONOS_REMOTE_DIR IONOS_LOCAL_DIR)
for key in "${required[@]}"; do
  if [[ -z "${!key:-}" ]]; then
    echo "Missing required config: $key" >&2
    echo "Set it in deploy/ionos.env or environment variables." >&2
    exit 2
  fi
done

if ! [[ "$IONOS_PORT" =~ ^[0-9]+$ ]]; then
  echo "IONOS_PORT must be an integer: $IONOS_PORT" >&2
  exit 2
fi

local_dir="$ROOT_DIR/$IONOS_LOCAL_DIR"
if [[ ! -d "$local_dir" ]]; then
  echo "Local deploy directory not found: $local_dir" >&2
  exit 2
fi

cmd=(
  "$ROOT_DIR/scripts/deploy_ionos_sftp.sh"
  --local-dir "$local_dir"
  --host "$IONOS_HOST"
  --user "$IONOS_USER"
  --port "$IONOS_PORT"
  --remote-dir "$IONOS_REMOTE_DIR"
)

if [[ -n "${IONOS_IDENTITY_FILE:-}" ]]; then
  cmd+=( --identity-file "$IONOS_IDENTITY_FILE" )
fi

if [[ "${1:-}" == "--dry-run" ]]; then
  cmd+=( --dry-run )
fi

"${cmd[@]}"
