// Nostromo Theme Demo - TypeScript/JavaScript
// This file showcases the syntax highlighting for the Nostromo themes

import { ReactNode, useState, useEffect } from 'react';
import type { Config, UserData } from './types';

/**
 * A class representing a spaceship navigation system
 * Multi-line comments are styled with italics in Nostromo themes
 */
export class NavigationSystem {
  // Private fields (readonly properties)
  private readonly shipName: string;
  private readonly maxSpeed: number = 500000; // km/h
  
  // Constants
  static readonly DEFAULT_HEADING = 36;
  static readonly PRESSURE_NORMAL = 1.0;
  
  // Public properties
  currentHeading: number;
  destination: string | null = null;
  
  constructor(shipName: string, initialHeading: number) {
    this.shipName = shipName;
    this.currentHeading = initialHeading;
  }
  
  /**
   * Calculate the trajectory to a destination
   * @param target - The target coordinates
   * @param speed - The cruising speed
   * @returns The calculated trajectory or null if invalid
   */
  public calculateTrajectory(target: Coordinates, speed: number): Trajectory | null {
    // Validate inputs first
    if (!target || speed <= 0) {
      console.error('Invalid trajectory parameters');
      return null;
    }
    
    // Calculate distance using the Euclidean formula
    const distance = Math.sqrt(target.x ** 2 + target.y ** 2);
    const time = distance / speed;
    
    return {
      distance,
      time,
      eta: new Date(Date.now() + time * 3600000)
    };
  }
  
  // Getter for ship name (readonly access)
  get name(): string {
    return this.shipName;
  }
  
  // Async method for fetching data
  async fetchNavigationData(): Promise<NavigationData> {
    try {
      const response = await fetch('/api/navigation');
      const data = await response.json();
      return data as NavigationData;
    } catch (error) {
      console.error('Failed to fetch navigation data:', error);
      throw new Error('Navigation system offline');
    }
  }
}

// Interface definitions
interface Coordinates {
  x: number;
  y: number;
  z?: number;
}

interface Trajectory {
  distance: number;
  time: number;
  eta: Date;
}

interface NavigationData {
  heading: number;
  speed: number;
  status: 'operational' | 'error' | 'warning';
}

// Enum example
enum AlertLevel {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

// Type alias
 type Vector3D = [number, number, number];

// React Component example
export const StatusPanel: React.FC<{ status: string; level: AlertLevel }> = ({ 
  status, 
  level 
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
  useEffect(() => {
    // Monitor status changes
    if (level === AlertLevel.CRITICAL) {
      setIsExpanded(true);
    }
  }, [level]);
  
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className={`status-panel ${level}`}>
      <h2>System Status: {status}</h2>
      <button onClick={handleToggle}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      {isExpanded && <p>Detailed diagnostic information...</p>}
    </div>
  );
};

// Decorator example (if using experimental decorators)
function logExecution(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    console.log(`Executing ${propertyKey} with args:`, args);
    return originalMethod.apply(this, args);
  };
  
  return descriptor;
}

// Regular expression example
const EMAIL_REGEX = /^[\w.-]+@[\w.-]+\.\w+$/;
const HEX_COLOR = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/;

// Template literal with interpolation
const greeting = (name: string) => `Welcome aboard the Nostromo, ${name}!`;

// Nullish coalescing and optional chaining
const config = {
  api: {
    endpoint: 'https://api.nostromo.space',
    timeout: 30000
  }
};

const timeout = config?.api?.timeout ?? 5000;

// Export all for demo
export { Coordinates, Trajectory, AlertLevel, EMAIL_REGEX };
export default NavigationSystem;
