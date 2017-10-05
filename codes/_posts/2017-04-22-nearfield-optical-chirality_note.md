---
layout: post
title: "Near-field optical chirality by electric dipoles_note"
date: 2017-04-22
categories: code_python_note
---


## *chiral_local* function

```python
import numpy as np

def chiral_local(incWave, xDipole, yDipole, position, mode='linear'):

    assert (mode=='linear') or (mode=='elliptical'), 'The mode is not correctly specified. Only "linear" or "elliptical" is allowed.'

    # Elin ~ cos(psi)<x> + sin(psi)<y>, k ~ <z>
    if mode is 'linear':
        # c of conjugate(E_xdipole) <dot> (B_inc,linear)
        c_ExBlin = xDipole[0]*xDipole[1]/2/position[0]**3*np.cos(incWave[1])*(3*np.cos(position[1])**2*np.cos(position[2])*np.sin(incWave[1]-position[2]) - np.sin(incWave[1]))

        # c of (B_xdipole) <dot> conjugate(E_inc,linear)
        c_BxElin = xDipole[0]*incWave[0]*xDipole[2]/2/position[0]**2*np.sin(position[1])*np.sin(2*incWave[1])

        # c of conjugate(E_ydipole) <dot> (B_inc,linear)
        c_EyBlin = yDipole[0]*yDipole[1]/2/position[0]**3*np.sin(incWave[1])*(3*np.cos(position[1])**2*np.sin(position[2])*np.sin(incWave[1]-position[2]) + np.cos(incWave[1]))

        # c of (B_ydipole) <dot> conjugate(E_inc,linear)
        c_ByElin = -yDipole[0]*incWave[0]*yDipole[2]/2/position[0]**2*np.sin(position[1])*np.sin(2*incWave[1])

        return (c_ExBlin + c_BxElin) + (c_EyBlin + c_ByElin)

    # Einc ~ cos(psi)<x> + i*sin(psi)<y>, k ~ <z>,
    else:        
        # c of conjugate(E_xdipole) <dot> (B_inc,cir)
        c_ExBcir = xDipole[0]/position[0]**3*np.cos(incWave[1])*(xDipole[2]*np.sin(incWave[1])*(3*np.cos(position[1])**2*np.cos(position[2])**2 - 1) - 3/4*xDipole[1]*np.cos(position[1])**2*np.sin(2*position[2])*np.cos(incWave[1]))

        # c of (B_xdipole) <dot> conjugate(E_inc,cir)
        c_BxEcir = -xDipole[0]*incWave[0]/4/position[0]**2*xDipole[1]*np.sin(position[1])*np.sin(2*incWave[1])

        # c of conjugate(E_ydipole) <dot> (B_inc,cir)
        c_EyBcir = yDipole[0]/position[0]**3*np.sin(incWave[1])*(yDipole[2]*np.cos(incWave[1])*(3*np.cos(position[1])**2*np.sin(position[2])**2 - 1) + 3/4*yDipole[1]*np.cos(position[1])**2*np.sin(2*position[2])*np.sin(incWave[1]))

        # c of (B_ydipole) <dot> conjugate(E_inc,cir)
        c_ByEcir = -yDipole[0]*incWave[0]/4/position[0]**2*yDipole[1]*np.sin(position[1])*np.sin(2*incWave[1])

        # c of conjugate(E_inc,cir) <dot> (B_inc,cir)
        c_EcirBcir = -np.sin(2*incWave[1]) # = -/+1 for psi = +/-45deg (perfec E_inc,cir)

        return (c_ExBcir + c_BxEcir) + (c_EyBcir + c_ByEcir) #+ c_EcirBcir
```
