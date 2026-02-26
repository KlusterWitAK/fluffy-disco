# fluffy-disco

LA-2A style two-knob HISE ScriptFX UI template.

## What this contains

- `hise/LA2A_ScriptFX.js`
  - A HISE script you can paste into a Script Processor / ScriptFX front-end.
  - Adds two LA-2A inspired knobs:
    - **Gain Reduction** (mapped to Macro 1)
    - **Level** (mapped to Macro 2)
  - Includes a custom `drawRotarySlider` LookAndFeel for vintage cream / brown LA-2A-style visuals.

## How to use in HISE

1. Open your HISE project and add your compressor / output chain.
2. Add a Script Processor (or ScriptFX UI script context).
3. Paste `hise/LA2A_ScriptFX.js`.
4. In Macro assignments:
   - Map **Macro 1** to compressor threshold / peak reduction style parameter.
   - Map **Macro 2** to output gain / makeup gain.
5. Compile and export as VST3 from HISE.

## Notes

- The script intentionally uses macro routing so it works with different compressor modules.
- If your compressor expects inverted behavior for gain reduction, invert the Macro 1 modulation range in HISE.
