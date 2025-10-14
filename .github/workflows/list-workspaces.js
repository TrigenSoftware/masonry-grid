import fs from 'fs/promises'
import path from 'path'

const scriptsToFind = process.argv.slice(2)
const workspaceDir = 'packages'
const workspaceFiles = await fs.readdir(workspaceDir, {
  withFileTypes: true
})
const foundWorkspaces = {}

for (const file of workspaceFiles) {
  if (file.isDirectory()) {
    try {
      const packageJson = await fs.readFile(path.join(workspaceDir, file.name, 'package.json'), 'utf-8')
      const { scripts } = JSON.parse(packageJson)

      if (scripts) {
        for (const scriptToFind of scriptsToFind) {
          if (scripts[scriptToFind]) {
            foundWorkspaces[scriptToFind] = foundWorkspaces[scriptToFind] || []
            foundWorkspaces[scriptToFind].push(file.name)
          }
        }
      }
    } catch {}
  }
}

for (const foundWorkspacesKey in foundWorkspaces) {
  console.log(foundWorkspacesKey.replaceAll(':', '-') + '=' + JSON.stringify(foundWorkspaces[foundWorkspacesKey]))
}
