#!/bin/bash

# Nostromo Theme Demo - Shell Script
# Demonstrates bash syntax highlighting

# Strict mode
set -euo pipefail

# Color codes (echo color codes)
readonly COLOR_CYAN='\033[36m'
readonly COLOR_GREEN='\033[32m'
readonly COLOR_RED='\033[31m'
readonly COLOR_YELLOW='\033[33m'
readonly COLOR_RESET='\033[0m'

# Configuration
SHIP_NAME="USCSS Nostromo"
LOG_FILE="/var/log/nostromo/system.log"
MAX_RETRIES=3
TIMEOUT_SECONDS=30

# Function to log messages
log_message() {
    local level="$1"
    local message="$2"
    local timestamp
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    case "$level" in
        INFO)
            echo -e "${COLOR_CYAN}[${timestamp}] INFO: ${message}${COLOR_RESET}"
            ;;
        SUCCESS)
            echo -e "${COLOR_GREEN}[${timestamp}] SUCCESS: ${message}${COLOR_RESET}"
            ;;
        WARNING)
            echo -e "${COLOR_YELLOW}[${timestamp}] WARNING: ${message}${COLOR_RESET}"
            ;;
        ERROR)
            echo -e "${COLOR_RED}[${timestamp}] ERROR: ${message}${COLOR_RESET}"
            ;;
        *)
            echo "[${timestamp}] ${level}: ${message}"
            ;;
    esac
}

# Function to check if a command exists
command_exists() {
    command -v "$1" &> /dev/null
}

# Initialize systems
initialize_systems() {
    log_message "INFO" "Initializing ${SHIP_NAME} systems..."
    
    # Array of systems to initialize
    local systems=(
        "life-support"
        "navigation"
        "communications"
        "weapons"
        "engines"
    )
    
    for system in "${systems[@]}"; do
        if init_system "$system"; then
            log_message "SUCCESS" "${system} initialized successfully"
        else
            log_message "ERROR" "Failed to initialize ${system}"
            return 1
        fi
    done
}

# Initialize a specific system
init_system() {
    local system_name="$1"
    local retry_count=0
    
    while [[ $retry_count -lt $MAX_RETRIES ]]; do
        if systemctl start "nostromo-${system_name}" 2>/dev/null; then
            return 0
        fi
        
        ((retry_count++))
        log_message "WARNING" "Retry ${retry_count}/${MAX_RETRIES} for ${system_name}"
        sleep 2
    done
    
    return 1
}

# Check environmental systems
check_environmental() {
    log_message "INFO" "Checking environmental systems..."
    
    # Simulated sensor readings
    local pressure
    local oxygen_level
    local temperature
    
    # Read from sensors (simulated)
    pressure=$(cat /sys/class/sensors/pressure 2>/dev/null || echo "101.3")
    oxygen_level=$(cat /sys/class/sensors/o2 2>/dev/null || echo "21.0")
    temperature=$(cat /sys/class/sensors/temp 2>/dev/null || echo "22.0")
    
    log_message "INFO" "Pressure: ${pressure} kPa | O2: ${oxygen_level}% | Temp: ${temperature}°C"
    
    # Validate ranges
    if (( $(echo "$pressure < 90" | bc -l) )); then
        log_message "ERROR" "Pressure critical!"
        return 1
    fi
    
    if (( $(echo "$oxygen_level < 19" | bc -l) )); then
        log_message "WARNING" "Oxygen levels low"
    fi
    
    return 0
}

# Main execution
main() {
    log_message "INFO" "=========================================="
    log_message "INFO" "   NOSTROMO SYSTEM INITIALIZATION"
    log_message "INFO" "=========================================="
    
    # Check if running as root
    if [[ $EUID -ne 0 ]]; then
        log_message "ERROR" "This script must be run as root"
        exit 1
    fi
    
    # Create log directory if needed
    mkdir -p "$(dirname "$LOG_FILE")"
    
    # Initialize all systems
    if initialize_systems; then
        log_message "SUCCESS" "All systems operational"
    else
        log_message "ERROR" "System initialization failed"
        exit 1
    fi
    
    # Run environmental check
    if check_environmental; then
        log_message "SUCCESS" "Environmental systems nominal"
    else
        log_message "WARNING" "Environmental systems require attention"
    fi
    
    # Process command line arguments
    case "${1:-}" in
        --status|-s)
            systemctl status nostromo-*
            ;;
        --stop)
            log_message "INFO" "Shutting down systems..."
            systemctl stop nostromo-*
            ;;
        --help|-h)
            cat << EOF
Usage: $0 [OPTION]

Options:
    --status, -s    Show system status
    --stop          Shutdown all systems
    --help, -h      Show this help message

Report bugs to: https://github.com/grikomsn/vscode-nostromo-theme/issues
EOF
            ;;
        *)
            log_message "INFO" "System initialization complete. Use --help for more options."
            ;;
    esac
}

# Cleanup function
cleanup() {
    log_message "INFO" "Cleaning up temporary files..."
    rm -f /tmp/nostromo-*.tmp
}

# Set trap for cleanup
trap cleanup EXIT

# Execute main function
main "$@"
