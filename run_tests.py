#!/usr/bin/env python3
"""
Comprehensive Test Suite pentru PFR Reactor Simulator
Testeaza solver-ul, validare fizica, si API endpoints
"""

import sys
import numpy as np
from pathlib import Path

# Add backend to path
backend_path = Path(__file__).parent / 'backend'
sys.path.insert(0, str(backend_path))

from backend.main import solve_pfr_model, ReactorParams, k_rate


class Colors:
    """ANSI color codes"""
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'


def test_arrhenius_law():
    """Test 1: Legea Arrhenius"""
    print(f"\n{Colors.BLUE}Test 1: Legea Arrhenius{Colors.END}")
    
    temps = [300, 320, 340, 360]
    k_values = [k_rate(T) for T in temps]
    
    # Verify monotonic increase
    assert all(k_values[i] < k_values[i+1] for i in range(len(k_values)-1)), \
        "k(T) trebuie sa fie monoton crescatoare"
    
    # Check magnitude
    assert all(k > 0 for k in k_values), "k(T) trebuie pozitiv"
    
    print(f"  {Colors.GREEN}✓{Colors.END} k(T) crescatoare: {[f'{k:.4f}' for k in k_values]}")
    return True


def test_mass_balance():
    """Test 2: Bilanţ de masă - conversia"""
    print(f"\n{Colors.BLUE}Test 2: Bilant de masa - Conversia{Colors.END}")
    
    params = ReactorParams()
    
    # Test case: T_in=330, u=1.5
    T_in = 330
    u = 1.5
    T_jacket = 280
    
    z_axis, T_profile, C_A_profile = solve_pfr_model(T_in, u, T_jacket)
    
    # Verificare descrștere monotona
    assert all(C_A_profile[i] >= C_A_profile[i+1] for i in range(len(C_A_profile)-1)), \
        "Concentratia trebuie sa fie monoton descrescatoare"
    
    # Verificare limita
    assert C_A_profile[-1] < params.C_A_inlet, "C_A_final < C_A_inlet"
    assert C_A_profile[-1] >= 0, "C_A_final >= 0"
    
    conversion = ((params.C_A_inlet - C_A_profile[-1]) / params.C_A_inlet) * 100
    print(f"  {Colors.GREEN}✓{Colors.END} Conversia finala: {conversion:.2f}%")
    assert 50 < conversion < 100, f"Conversia trebuie intre 50-100%, obtinuta: {conversion:.1f}%"
    
    return True


def test_energy_balance():
    """Test 3: Bilanţ de energie - transfer termic"""
    print(f"\n{Colors.BLUE}Test 3: Bilant de energie - Transfer termic{Colors.END}")
    
    params = ReactorParams()
    
    # Test cu diferite T_jacket
    test_cases = [
        (330, 1.5, 250),  # T_jacket mic
        (330, 1.5, 280),  # T_jacket normal
        (330, 1.5, 300),  # T_jacket mare
    ]
    
    for T_in, u, T_jacket in test_cases:
        z_axis, T_profile, C_A_profile = solve_pfr_model(T_in, u, T_jacket)
        
        # Temperatura finala trebuie intre T_jacket si T_in
        assert T_jacket <= T_profile[-1] <= T_in or T_profile[-1] <= T_jacket, \
            f"Temperatura finala trebuie aproape de T_jacket"
        
        print(f"  {Colors.GREEN}✓{Colors.END} T_in={T_in}, T_jacket={T_jacket}: " \
              f"T_final={T_profile[-1]:.1f}K")
    
    return True


def test_parametric_sensitivity():
    """Test 4: Sensibilitate parametrica"""
    print(f"\n{Colors.BLUE}Test 4: Sensibilitate parametrica{Colors.END}")
    
    params = ReactorParams()
    base_case = solve_pfr_model(330, 1.5, 280)
    base_conversion = ((params.C_A_inlet - base_case[2][-1]) / params.C_A_inlet) * 100
    
    # Test 1: Temperatura mai mare -> conversia mai mare
    high_temp = solve_pfr_model(340, 1.5, 280)
    high_conversion = ((params.C_A_inlet - high_temp[2][-1]) / params.C_A_inlet) * 100
    assert high_conversion > base_conversion, "T_in mai mare -> conversia mai mare"
    print(f"  {Colors.GREEN}✓{Colors.END} T_in: 330→340K, Conversia: {base_conversion:.1f}→{high_conversion:.1f}%")
    
    # Test 2: Viteza mai mica -> conversia mai mare (timp rezidenţa mai mare)
    slow_flow = solve_pfr_model(330, 1.0, 280)
    slow_conversion = ((params.C_A_inlet - slow_flow[2][-1]) / params.C_A_inlet) * 100
    assert slow_conversion > base_conversion, "Viteza mai mica -> conversia mai mare"
    print(f"  {Colors.GREEN}✓{Colors.END} u: 1.5→1.0 m/s, Conversia: {base_conversion:.1f}→{slow_conversion:.1f}%")
    
    return True


def test_numerical_stability():
    """Test 5: Stabilitate numerica - fara NaN/Inf"""
    print(f"\n{Colors.BLUE}Test 5: Stabilitate numerica{Colors.END}")
    
    test_cases = [
        (300, 0.5, 250),
        (350, 5.0, 300),
        (320, 2.0, 280),
    ]
    
    for T_in, u, T_jacket in test_cases:
        z_axis, T_profile, C_A_profile = solve_pfr_model(T_in, u, T_jacket)
        
        assert not np.any(np.isnan(T_profile)), f"NaN in T_profile pentru {T_in},{u},{T_jacket}"
        assert not np.any(np.isinf(T_profile)), f"Inf in T_profile pentru {T_in},{u},{T_jacket}"
        assert not np.any(np.isnan(C_A_profile)), f"NaN in C_A_profile"
        assert not np.any(np.isinf(C_A_profile)), f"Inf in C_A_profile"
        
        print(f"  {Colors.GREEN}✓{Colors.END} Cazul ({T_in}K, {u}m/s, {T_jacket}K) - OK")
    
    return True


def test_boundary_conditions():
    """Test 6: Conditii la limita"""
    print(f"\n{Colors.BLUE}Test 6: Conditii la limita{Colors.END}")
    
    params = ReactorParams()
    
    T_in = 330
    u = 1.5
    T_jacket = 280
    
    z_axis, T_profile, C_A_profile = solve_pfr_model(T_in, u, T_jacket)
    
    # Verificare conditian inițiale (z=0)
    assert abs(T_profile[0] - T_in) < 1e-10, "T(0) trebuie egal cu T_in"
    assert abs(C_A_profile[0] - params.C_A_inlet) < 1e-10, "C_A(0) trebuie egal cu C_A_inlet"
    
    print(f"  {Colors.GREEN}✓{Colors.END} T(z=0) = {T_profile[0]:.1f}K (expected {T_in}K)")
    print(f"  {Colors.GREEN}✓{Colors.END} C_A(z=0) = {C_A_profile[0]:.4f} mol/m3")
    
    # Verificare lungime
    assert abs(z_axis[-1] - params.L_reactor) < 1e-10, "z_final trebuie egal cu L_reactor"
    print(f"  {Colors.GREEN}✓{Colors.END} z(final) = {z_axis[-1]:.1f}m (expected {params.L_reactor}m)")
    
    return True


def run_all_tests():
    """Run all tests"""
    print(f"{Colors.YELLOW}{'='*60}")
    print("  PFR REACTOR SIMULATOR - TEST SUITE")
    print(f"{'='*60}{Colors.END}")
    
    tests = [
        test_arrhenius_law,
        test_mass_balance,
        test_energy_balance,
        test_parametric_sensitivity,
        test_numerical_stability,
        test_boundary_conditions,
    ]
    
    results = []
    for test_func in tests:
        try:
            result = test_func()
            results.append((test_func.__name__, True, None))
        except AssertionError as e:
            results.append((test_func.__name__, False, str(e)))
            print(f"  {Colors.RED}✗ FAILED: {e}{Colors.END}")
        except Exception as e:
            results.append((test_func.__name__, False, f"ERROR: {str(e)}"))
            print(f"  {Colors.RED}✗ ERROR: {e}{Colors.END}")
    
    # Summary
    print(f"\n{Colors.YELLOW}{'='*60}")
    print("  TEST SUMMARY")
    print(f"{'='*60}{Colors.END}")
    
    passed = sum(1 for _, success, _ in results if success)
    total = len(results)
    
    for name, success, error in results:
        status = f"{Colors.GREEN}PASS{Colors.END}" if success else f"{Colors.RED}FAIL{Colors.END}"
        print(f"  {status}: {name}")
    
    print(f"\n  Total: {passed}/{total} tests passed")
    
    if passed == total:
        print(f"\n{Colors.GREEN}Toate testele au trecut! Aplicatia e gata pentru deployment.{Colors.END}\n")
        return 0
    else:
        print(f"\n{Colors.RED}{total - passed} test(e) au esuat!{Colors.END}\n")
        return 1


if __name__ == '__main__':
    exit_code = run_all_tests()
    sys.exit(exit_code)
