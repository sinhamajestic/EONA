import psutil
import time
import logging
from datetime import datetime
from dataclasses import dataclass
from typing import Dict, List

@dataclass
class SystemMetrics:
    timestamp: datetime
    cpu_percent: float
    memory_percent: float
    disk_usage: float
    active_connections: int

class SystemMonitor:
    def __init__(self, log_file: str = "logs/eona_system_metrics.log"):
        self.logger = logging.getLogger("SystemMonitor")
        handler = logging.FileHandler(log_file)
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)
        self.logger.setLevel(logging.INFO)
    
    def collect_metrics(self) -> SystemMetrics:
        """Collect current system metrics"""
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')
        
        # Count network connections (approximation of active connections)
        connections = len(psutil.net_connections())
        
        return SystemMetrics(
            timestamp=datetime.utcnow(),
            cpu_percent=cpu_percent,
            memory_percent=memory.percent,
            disk_usage=disk.percent,
            active_connections=connections
        )
    
    def log_metrics(self):
        """Log system metrics"""
        metrics = self.collect_metrics()
        
        self.logger.info(
            f"CPU: {metrics.cpu_percent}% | "
            f"Memory: {metrics.memory_percent}% | "
            f"Disk: {metrics.disk_usage}% | "
            f"Connections: {metrics.active_connections}"
        )
        
        # Alert on high resource usage
        if metrics.cpu_percent > 80:
            self.logger.warning(f"High CPU usage: {metrics.cpu_percent}%")
        
        if metrics.memory_percent > 85:
            self.logger.warning(f"High memory usage: {metrics.memory_percent}%")
        
        if metrics.disk_usage > 90:
            self.logger.warning(f"High disk usage: {metrics.disk_usage}%")
    
    def start_monitoring(self, interval: int = 60):
        """Start continuous monitoring"""
        self.logger.info("Starting system monitoring...")
        
        while True:
            try:
                self.log_metrics()
                time.sleep(interval)
            except KeyboardInterrupt:
                self.logger.info("Monitoring stopped by user")
                break
            except Exception as e:
                self.logger.error(f"Monitoring error: {e}")
                time.sleep(interval)

if __name__ == "__main__":
    monitor = SystemMonitor()
    monitor.start_monitoring(interval=30)  # Monitor every 30 seconds
