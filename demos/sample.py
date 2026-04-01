"""
Nostromo Theme Demo - Python
Demonstrates Python syntax highlighting across all Nostromo theme variants
"""

from __future__ import annotations
from dataclasses import dataclass, field
from typing import Optional, Dict, List, Union, Any, Callable
from enum import Enum, auto
import json
import re
from pathlib import Path


class LifeformClassification(Enum):
    """Classification of detected lifeforms"""
    UNKNOWN = auto()
    HUMAN = auto()
    SYNTHETIC = auto()
    XENOMORPH = auto()
    ORGANIC = auto()
    
    
@dataclass(frozen=True)
class Coordinates:
    """3D coordinates in space"""
    x: float
    y: float
    z: float = 0.0
    
    def distance_to(self, other: Coordinates) -> float:
        """Calculate Euclidean distance to another point"""
        return (
            (self.x - other.x) ** 2 + 
            (self.y - other.y) ** 2 + 
            (self.z - other.z) ** 2
        ) ** 0.5


@dataclass
class CrewMember:
    """Represents a crew member on the Nostromo"""
    name: str
    role: str
    id: int
    is_synthetic: bool = False
    _security_clearance: int = field(default=1, repr=False)
    
    def __post_init__(self):
        if self.is_synthetic:
            self._security_clearance = 5
    
    def can_access(self, area_level: int) -> bool:
        """Check if crew member can access restricted area"""
        return self._security_clearance >= area_level
    
    @property
    def clearance_level(self) -> int:
        """Read-only access to security clearance"""
        return self._security_clearance


class ShipSystems:
    """
    Main ship systems controller for the Nostromo
    Monitors all critical functions and environmental controls
    """
    
    # Class constants
    MAX_PRESSURE = 101.325  # kPa
    MIN_O2_LEVEL = 19.5  # percent
    TEMP_RANGE = (18.0, 24.0)  # celsius
    
    def __init__(self, ship_name: str = "USCSS Nostromo") -> None:
        self._ship_name = ship_name
        self._pressure: float = self.MAX_PRESSURE
        self._o2_level: float = 21.0
        self._temperature: float = 22.0
        self._crew: List[CrewMember] = []
        self._lifeforms: Dict[int, LifeformClassification] = {}
        self._is_operational: bool = True
        
    @property
    def ship_name(self) -> str:
        """Get the ship's designation"""
        return self._ship_name
    
    @property
    def is_operational(self) -> bool:
        """System operational status"""
        return self._is_operational
    
    def add_crew_member(self, member: CrewMember) -> None:
        """Add a crew member to the manifest"""
        if not isinstance(member, CrewMember):
            raise TypeError("Must provide a CrewMember instance")
        self._crew.append(member)
    
    def scan_for_lifeforms(self, sector: Coordinates) -> List[Dict[str, Any]]:
        """
        Scan a sector for biological signatures
        
        Args:
            sector: The coordinates to scan
            
        Returns:
            List of detected lifeform signatures
        """
        detected: List[Dict[str, Any]] = []
        
        # Simulate scanning
        for crew in self._crew:
            distance = sector.distance_to(Coordinates(0.0, 0.0, 0.0))
            if distance < 1000:
                detected.append({
                    'type': 'crew',
                    'classification': LifeformClassification.HUMAN,
                    'distance': distance,
                    'identity': crew.name if crew.can_access(3) else 'UNKNOWN'
                })
        
        return detected
    
    def environmental_check(self) -> Dict[str, Union[str, bool]]:
        """Check all environmental systems"""
        status = {
            'pressure_ok': self.MIN_O2_LEVEL <= self._pressure <= self.MAX_PRESSURE,
            'oxygen_ok': self._o2_level >= self.MIN_O2_LEVEL,
            'temp_ok': self.TEMP_RANGE[0] <= self._temperature <= self.TEMP_RANGE[1],
            'overall': 'NOMINAL'
        }
        
        if not all([status['pressure_ok'], status['oxygen_ok'], status['temp_ok']]):
            status['overall'] = 'WARNING'
        
        return status
    
    async def send_distress_signal(self, coordinates: Coordinates) -> bool:
        """Send emergency distress beacon"""
        try:
            # Simulate async network call
            signal_data = {
                'ship': self._ship_name,
                'coordinates': [coordinates.x, coordinates.y, coordinates.z],
                'priority': 'CRITICAL',
                'timestamp': 'now'
            }
            print(f"Distress signal sent from {self._ship_name}")
            return True
        except Exception as e:
            print(f"Failed to send distress signal: {e}")
            return False
    
    @staticmethod
    def validate_id(id_str: str) -> bool:
        """Validate a crew ID format"""
        pattern = re.compile(r'^NOS-\d{4}$')
        return bool(pattern.match(id_str))


def main() -> None:
    """Main execution function"""
    # Create ship instance
    nostromo = ShipSystems("USCSS Nostromo")
    
    # Create crew
    dallas = CrewMember("Dallas", "Captain", 1001)
    ripley = CrewMember("Ripley", "Warrant Officer", 1002)
    ash = CrewMember("Ash", "Science Officer", 1003, is_synthetic=True)
    
    # Add to manifest
    nostromo.add_crew_member(dallas)
    nostromo.add_crew_member(ripley)
    nostromo.add_crew_member(ash)
    
    # Check systems
    env_status = nostromo.environmental_check()
    print(f"Environmental Status: {env_status['overall']}")
    
    # Scan sector
    current_sector = Coordinates(150.5, 200.3, 50.0)
    lifeforms = nostromo.scan_for_lifeforms(current_sector)
    
    print(f"Detected {len(lifeforms)} signatures in sector {current_sector}")


if __name__ == "__main__":
    main()
