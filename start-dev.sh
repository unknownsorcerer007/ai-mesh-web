#!/bin/bash
# Self-daemonizing dev server starter using double-fork.
# Fully detaches from any terminal/session so it survives shell exits.

cd /home/z/my-project

# Kill any existing next dev
pkill -9 -f "next dev" 2>/dev/null
sleep 1

# Double-fork: parent exits, child forks grandchild and exits, grandchild is daemon
(
  # First fork
  setsid node /home/z/my-project/node_modules/.bin/next dev -p 3000 \
    </dev/null >/home/z/my-project/dev.log 2>&1 &
  echo $! > /home/z/my-project/dev.pid
) &

# Give it a moment
sleep 1
exit 0
