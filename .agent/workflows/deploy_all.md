---
description: Deploy/Push all TipsMega changes (Frontend + Backend) to GitHub for Coolify
---

This workflow automates the process of pushing changes from both the Frontend (`tipsmega-ui`) and Backend (`tipsmega-ui/api-mini`) repositories to GitHub. This ensures Coolify can pull the latest code.

1. **Push Frontend Changes**

    ```powershell
    cd c:\Users\Acer\tipsmega-ui; git add .; git commit -m "Auto deployment push"; git push
    ```

2. **Push Backend Changes**

    ```powershell
    cd c:\Users\Acer\tipsmega-ui\api-mini; git add .; git commit -m "Auto deployment push"; git push
    ```

> [!NOTE]
> If there are no changes to push, git will just say "nothing to commit", which is fine.
