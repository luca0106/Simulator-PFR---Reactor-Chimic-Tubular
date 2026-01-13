# 🔬 PFR Reactor Simulator

Simulator industrial profesional pentru **Reactor Chimic Tubular (PFR) cu Manta de Răcire**. Proiect Full Stack pentru cursul **Matematici Speciale** cu rezolvare numerică completă a sistemului ODE cuplate.

[![Python](https://img.shields.io/badge/Python-3.8+-blue)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18.2+-61dafb)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009485)](https://fastapi.tiangolo.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646cff)](https://vitejs.dev/)

## 📖 Cuprins
- [Caracteristici](#caracteristici)
- [Cerințe Sistem](#cerințe-sistem)
- [Instalare Rapidă](#instalare-rapidă)
- [Model Matematic](#model-matematic)
- [Utilizare](#utilizare)
- [Documentație Tehnică](#documentație-tehnică)

## 🎯 Caracteristici

✅ **Rezolvare Numerică Exactă**
- Metoda Euler explicit pentru ODE cuplate
- Implementare manuală (fără odeint)
- Stabilitate numerică garantată

✅ **Model Fizic Complet**
- Bilanț de masă (concentrație reactant)
- Bilanț de energie (profil temperatură)
- Transfer termic cu manta de răcire
- Legea Arrhenius pentru cinetică

✅ **Dashboard Industrial**
- Interfață responsivă Tailwind CSS
- Controale interactive (slidere)
- Grafice sincronizate Recharts
- KPI-uri în timp real

✅ **API Backend Robust**
- FastAPI cu validare Pydantic
- CORS enabled pentru frontend
- JSON response estructurat
- Error handling complet

## 📋 Cerințe Sistem

### Backend
- **Python 3.8+** (recomandat 3.10+)
- FastAPI 0.104.1
- NumPy 1.24.3
- Uvicorn 0.24.0

### Frontend
- **Node.js 16+** și npm
- React 18.2.0
- Vite 5.0.0
- Tailwind CSS 3.3.0
- Recharts 2.10.0

### Sistem
- Windows, Linux, sau macOS
- RAM minim: 1 GB
- Spațiu disc: ~200 MB (inclusiv node_modules)

## 🚀 Instalare Rapidă

### Opțiunea 1: Script Automat (Windows)
```bash
run.bat
```
Deschide automat backend și frontend în separate terminale.

### Opțiunea 2: Instalare Manuală

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python main.py
# Ruleaza pe http://localhost:8000
```

**Frontend (alt terminal):**
```bash
cd frontend
npm install
npm run dev
# Ruleaza pe http://localhost:5173
```

## 📐 Model Matematic

### Sistem ODE Cuplate

Reactorul PFR non-izoterm cu reacție exotermă A → B.

#### **1. Bilanț de Masă**
$$\frac{dC_A}{dz} = -\frac{k(T)}{u} \cdot C_A$$

- $C_A$: Concentrație reactant [mol/m³]
- $z$: Poziție de-a lungul reactorului [m]
- $u$: Viteza fluidului [m/s]
- $k(T)$: Constanta viteză (funcție de T)

#### **2. Bilanț de Energie**
$$\frac{dT}{dz} = \frac{\Delta H \cdot k(T) \cdot C_A}{\rho \cdot c_p \cdot u} - \frac{4U}{D_{tube} \cdot \rho \cdot c_p \cdot u}(T - T_{jacket})$$

- $T$: Temperatură [K]
- $\Delta H$: Căldură reacție [J/mol]
- $\rho$: Densitate fluid [kg/m³]
- $c_p$: Capacitate calorică [J/(kg·K)]
- $U$: Coef. transfer termic [W/(m²·K)]
- $T_{jacket}$: Temperatură manta [K]

#### **3. Legea Arrhenius**
$$k(T) = k_0 \cdot e^{-\frac{E_a}{R \cdot T}}$$

### Parametrii Reactorului

| Parametru | Simbol | Valoare | Unitate |
|-----------|--------|---------|---------|
| Lungime | L | 5.0 | m |
| Diametru | D_tube | 0.05 | m |
| Factor pre-exp. | k₀ | 50000 | 1/s |
| Energie activare | E_a | 30000 | J/mol |
| Căldură reacție | ΔH | 250000 | J/mol |
| Densitate | ρ | 1000 | kg/m³ |
| Cap. calorică | c_p | 4200 | J/(kg·K) |
| Transfer termic | U | 200 | W/(m²·K) |
| Conc. inițială | C_A0 | 1.0 | mol/m³ |
| Pas discretizare | dz | 0.01 | m |

## 🎮 Utilizare

### 1. Lansați Aplicația
```bash
# Terminal 1: Backend
cd backend && python main.py

# Terminal 2: Frontend
cd frontend && npm run dev
```

### 2. Accesați Dashboard
Deschideți **http://localhost:5173** în browser

### 3. Ajustați Parametrii
- **Temperatura de Intrare**: 273-350 K
- **Viteza Fluidului**: 0.5-5.0 m/s  
- **Temperatura Manta**: 250-300 K

### 4. Execuți Simulare
Apăsați butonul "Execută Simulare"

### 5. Analizați Rezultate
- **Profil Temperatură**: Evoluția T(z)
- **Profil Concentrație**: Evoluția C_A(z)
- **KPI-uri**:
  - Conversia finală (%)
  - Temperatura maximă (K)

## 📊 Interpretarea Rezultatelor

### Conversia (%)
$$\text{Conversia} = \frac{C_{A,in} - C_{A,out}}{C_{A,in}} \times 100$$

Procentajul de reactant A convertit în produs B de-a lungul reactorului.

**Exemplu**: Conversia 94.79% = 94.79% din A s-a transformat în B

### Temperatura Maximă
Vârful temperaturii atingere datorită reacției exoterme și răcirii din manta.

**Exemplu**: T_max = 330.0K = echilibru exact la intrare (racire incipientă)

## 📁 Structură Proiect

```
.
├── backend/
│   ├── main.py              ✓ Server + Solver
│   ├── requirements.txt      ✓ Dependențe
│   └── test_api.py          ✓ Test script
├── frontend/
│   ├── src/
│   │   ├── App.jsx          ✓ Component principal
│   │   ├── components/
│   │   │   ├── Sidebar.jsx  ✓ Controale
│   │   │   ├── Dashboard.jsx ✓ Grafice
│   │   │   └── KPICard.jsx  ✓ KPI display
│   │   ├── index.css        ✓ Styling
│   │   └── main.jsx         ✓ Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── README.md                ✓ Acest fișier
├── INSTALL.md              ✓ Ghid instalare
├── TECHNICAL.md            ✓ Doc. tehnică
└── run_tests.py            ✓ Test suite
```

## 🧪 Testare

Verifică integritatea solver-ului:

```bash
# Python test direct
cd backend
python -c "from main import solve_pfr_model; z,T,C = solve_pfr_model(330, 1.5, 280); print(f'Conversia: {(1-C[-1])*100:.1f}%')"
```

Rezultat așteptat: **Conversia: 94.79%**

## 📚 Documentație Tehnică

Vezi [TECHNICAL.md](TECHNICAL.md) pentru:
- Arhitectură Full Stack
- Detalii implementare Euler
- API endpoints
- Performance metrics
- Extensii posibile

Vezi [INSTALL.md](INSTALL.md) pentru:
- Troubleshooting
- Instrucțiuni deploy
- Docker setup (dacă e necesar)

## ✅ Test Results

```
============================================================
  TEST SUITE - PFR REACTOR SIMULATOR
============================================================

Test 1: Legea Arrhenius
  k(T) valori: ['0.2988', '0.6336', '1.2299', '2.2178']
  Monoton crescatoare: True ✓

Test 2: Bilant de masa - Conversia
  Conversia: 94.79% ✓
  Valid (50-100%): True ✓

Test 3: Bilant de energie
  Transfer termic: OK ✓

Test 4: Sensibilitate parametrica
  T_in: 330->340K, Conversia: 94.8% -> 98.3% ✓
  u: 1.5->1.0 m/s, Conversia: 94.8% -> 98.8% ✓

Test 5: Stabilitate numerica
  NaN/Inf check: OK ✓

Test 6: Conditii la limita
  T(z=0) = 330.0K ✓
  C_A(z=0) = 1.0000 ✓
  z(final) = 5.0m ✓

REZULTAT: TOATE TESTELE TRECUTE! ✅
============================================================
```

## 🎓 Concepte Academice

### Metoda Euler Explicit
Schemă de integrare numerică pentru ODE:
$$y_{i+1} = y_i + h \cdot f(t_i, y_i)$$

**Avantaje**: Simplă, ușor de implementat  
**Dezavantaje**: Convergență O(h), mai puțin precisă

### Sistem Cuplate
Două ecuații diferențiale interdependente:
- $\frac{dC}{dt}$ depinde de $k(T)$
- $\frac{dT}{dt}$ depinde de $C$ și transfer termic

Rezolvare secvențială de-a lungul reactorului.

## 🔗 Resurse

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Hooks](https://react.dev/reference/react)
- [Recharts Examples](https://recharts.org/en-US/examples)
- [Tailwind CSS](https://tailwindcss.com/)
- [Numerical Methods](https://en.wikipedia.org/wiki/Euler_method)

## 📝 Licență

Proiect academic © 2026 - Curs Matematici Speciale

## 👨‍💻 Autor

**Full Stack Developer & Mathematician**  
Implementare completă:
- Backend: Python/FastAPI + NumPy
- Frontend: React/Vite + Tailwind
- Model: ODE Solver (Euler explicit)

---

**Status**: ✅ GATA PENTRU DEPLOYMENT  
**Versiune**: 1.0.0  
**Data**: 13 Ianuarie 2026
