#!/usr/bin/env python3
"""Test script pentru FastAPI endpoint"""

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

# Test 1: GET root
print('Test 1: GET /')
response = client.get('/')
print(f'  Status: {response.status_code}')
print(f'  Data: {response.json()}')

# Test 2: POST /simulate cu parametrii normali
print('\nTest 2: POST /simulate (parametrii normali)')
data = {
    'T_in': 310,
    'Flow_Velocity': 1.5,
    'T_jacket': 280
}
response = client.post('/simulate', json=data)
print(f'  Status: {response.status_code}')
result = response.json()
print(f'  Final Conversion: {result["final_conversion"]:.1f}%')
print(f'  Max Temperature: {result["max_temperature"]:.1f} K')
print(f'  Data points: {len(result["z_axis"])}')

# Test 3: POST /simulate cu temperatură mai ridicată
print('\nTest 3: POST /simulate (T_in mai ridicata)')
data = {
    'T_in': 330,
    'Flow_Velocity': 2.0,
    'T_jacket': 280
}
response = client.post('/simulate', json=data)
print(f'  Status: {response.status_code}')
result = response.json()
print(f'  Final Conversion: {result["final_conversion"]:.1f}%')
print(f'  Max Temperature: {result["max_temperature"]:.1f} K')

print('\nTeste API finalizate cu succes!')
