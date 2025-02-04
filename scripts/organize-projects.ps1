# PowerShell script to organize attendance projects
$ErrorActionPreference = "Stop"

# Function to create directory if it doesn't exist
function EnsureDirectory {
    param($path)
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force
        Write-Host "Created directory: $path"
    }
}

# Function to copy local projects
function CopyLocalProjects {
    param($config)
    
    foreach ($path in $config.localProjectPaths) {
        if (Test-Path $path) {
            $projectName = (Get-Item $path).Name
            $destinationPath = Join-Path $config.targetDirectory "local-projects" $projectName
            
            Write-Host "Copying local project: $projectName"
            EnsureDirectory (Join-Path $config.targetDirectory "local-projects")
            Copy-Item -Path $path -Destination $destinationPath -Recurse -Force
        }
    }
}

# Function to clone remote repositories
function CloneRemoteRepos {
    param($config)
    
    $remotesPath = Join-Path $config.targetDirectory "remote-projects"
    EnsureDirectory $remotesPath
    
    foreach ($repo in $config.remoteRepos) {
        $repoPath = Join-Path $remotesPath $repo.folder
        
        if (-not (Test-Path $repoPath)) {
            Write-Host "Cloning repository: $($repo.name)"
            git clone $repo.url $repoPath
        } else {
            Write-Host "Updating repository: $($repo.name)"
            Push-Location $repoPath
            git pull
            Pop-Location
        }
    }
}

# Main execution
try {
    # Read configuration
    $configPath = Join-Path $PSScriptRoot "config.json"
    $config = Get-Content $configPath | ConvertFrom-Json
    
    # Create main target directory
    EnsureDirectory $config.targetDirectory
    
    # Process local projects
    Write-Host "Processing local projects..."
    CopyLocalProjects $config
    
    # Process remote repositories
    Write-Host "Processing remote repositories..."
    CloneRemoteRepos $config
    
    # Create summary file
    $summaryPath = Join-Path $config.targetDirectory "project-summary.md"
    $summary = @"
# Attendance Projects Summary
Generated on: $(Get-Date)

## Local Projects
$(
    foreach ($path in $config.localProjectPaths) {
        if (Test-Path $path) {
            "- $((Get-Item $path).Name)"
        }
    }
)

## Remote Projects
$(
    foreach ($repo in $config.remoteRepos) {
        "- $($repo.name) (in folder: $($repo.folder))"
    }
)
"@
    
    Set-Content -Path $summaryPath -Value $summary
    Write-Host "Summary created at: $summaryPath"
    
    Write-Host "Project organization completed successfully!"
} catch {
    Write-Error "An error occurred: $_"
    exit 1
}