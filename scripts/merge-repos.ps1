# PowerShell script to merge repositories
$ErrorActionPreference = "Stop"

# Base directory where all repositories will be merged
$mainDir = "C:\Users\mnjew\Projects\attendance-master\attendance-system-collection"

# Create the main directory if it doesn't exist
New-Item -ItemType Directory -Force -Path $mainDir

# Source directory where repositories are currently located
$sourceDir = "C:\Users\mnjew\Projects\attendance-master\remote-projects"

# Function to copy repository contents
function Copy-Repository {
    param(
        [string]$sourcePath,
        [string]$destPath,
        [string]$repoName
    )
    
    Write-Host "Moving $repoName to main collection..."
    
    # Create version directory in main folder
    New-Item -ItemType Directory -Force -Path $destPath
    
    # Copy all items except .git folder
    Get-ChildItem -Path $sourcePath -Exclude .git | Copy-Item -Destination $destPath -Recurse -Force
    
    # Copy specific Git files if they exist
    $gitFiles = @('.gitignore', '.gitattributes')
    foreach ($file in $gitFiles) {
        if (Test-Path "$sourcePath\$file") {
            Copy-Item "$sourcePath\$file" -Destination "$destPath\" -Force
        }
    }
}

# Array of repository information
$repositories = @(
    @{
        SourcePath = "$sourceDir\01-automated-time-attendance"
        DestPath = "$mainDir\v1-automated-time"
        Name = "Automated Time Attendance"
    },
    @{
        SourcePath = "$sourceDir\02-smart-attendance-app"
        DestPath = "$mainDir\v2-smart-app"
        Name = "Smart Attendance App"
    },
    @{
        SourcePath = "$sourceDir\03-smart-attendance-v3"
        DestPath = "$mainDir\v3-smart-system"
        Name = "Smart Attendance V3"
    },
    @{
        SourcePath = "$sourceDir\04-smart-attendance-system-v3.1"
        DestPath = "$mainDir\v3.1-smart-system"
        Name = "Smart Attendance System V3.1"
    },
    @{
        SourcePath = "$sourceDir\05-smart-attendance-system"
        DestPath = "$mainDir\v4-latest"
        Name = "Latest Smart Attendance System"
    }
)

try {
    # Create main README
    $readmeContent = @"
# Attendance System Collection
A comprehensive collection of all attendance system versions.

## Project Structure

1. **V1 - Automated Time Attendance** (Initial Version)
   - Basic time tracking functionality
   - Original implementation

2. **V2 - Smart Attendance App** (Web Version)
   - Web-based implementation
   - Basic features

3. **V3 - Smart System** (Enhanced Version)
   - Improved features
   - Better user interface

4. **V3.1 - Smart System** (Refinement)
   - Bug fixes
   - Performance improvements

5. **V4 - Latest** (Current Version)
   - Full TypeScript implementation
   - Complete system with all features

## Setup
Each version has its own setup instructions in its respective folder.

## Version History
Organized chronologically from V1 to the latest version.

Generated: $(Get-Date)
"@

    Set-Content -Path "$mainDir\README.md" -Value $readmeContent

    # Process each repository
    foreach ($repo in $repositories) {
        Copy-Repository -sourcePath $repo.SourcePath -destPath $repo.DestPath -repoName $repo.Name
    }

    Write-Host "Successfully merged all repositories into: $mainDir"
    Write-Host "Created main README with project structure"

} catch {
    Write-Error "An error occurred: $_"
    exit 1
}