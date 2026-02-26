/*
    LA-2A style 2-knob front-end for HISE ScriptFX / Script Processor.

    Controls:
    - Gain Reduction (maps to Macro 1; suggested connection: compressor threshold / peak reduction)
    - Level          (maps to Macro 2; suggested connection: output makeup gain)

    Wiring suggestion in HISE:
    1) Add your optical compressor chain.
    2) Connect Macro 1 -> compressor threshold (invert mapping if needed).
    3) Connect Macro 2 -> output gain.
*/

Content.makeFrontInterface(460, 220);

const var laf = Engine.createGlobalScriptLookAndFeel();

laf.registerFunction("drawRotarySlider", function(g, obj)
{
    var a = obj.area;
    var r = [a[0] + 8, a[1] + 8, a[2] - 16, a[3] - 16];
    var cx = r[0] + r[2] * 0.5;
    var cy = r[1] + r[3] * 0.5;
    var radius = r[2] * 0.5;

    var start = -2.45;
    var end = 2.45;
    var angle = start + (end - start) * obj.valueNormalized;

    // LA-2A inspired cream face
    g.setColour(0xFFE8DFC8);
    g.fillEllipse(r);

    // Bezel
    g.setColour(0xFF2F2A22);
    g.drawEllipse(r, 2.0);

    // Tick ring
    g.setColour(0x80352E22);
    g.drawEllipse([r[0] + 6, r[1] + 6, r[2] - 12, r[3] - 12], 1.2);

    // Pointer
    var pointerLen = radius * 0.62;
    var px = cx + Math.cos(angle) * pointerLen;
    var py = cy + Math.sin(angle) * pointerLen;

    g.setColour(0xFFB24A1F);
    g.drawLine(cx, cy, px, py, 3.0);

    // Cap
    g.setColour(0xFF332C24);
    g.fillEllipse([cx - 4, cy - 4, 8, 8]);

    // Label
    g.setFont("Arial", 14.0);
    g.setColour(0xFF1E1A15);
    g.drawAlignedText(obj.text, [a[0], a[1] + a[3] - 28, a[2], 20], "centred");
});

inline function setupKnob(name, x, y, min, max, step, mid)
{
    local k = Content.addKnob(name, x, y);
    k.set("width", 180);
    k.set("height", 180);
    k.set("text", name);
    k.set("suffix", " dB");
    k.set("middlePosition", mid);
    k.setRange(min, max, step);
    k.setLocalLookAndFeel(laf);
    return k;
}

const var GainReduction = setupKnob("Gain Reduction", 30, 20, 0.0, 100.0, 0.1, 0.0);
const var Level = setupKnob("Level", 250, 20, -24.0, 24.0, 0.1, 0.0);

inline function onGainReductionControl(component, value)
{
    // Macro 1 is typically connected to compressor threshold / peak reduction.
    Synth.setMacroControl(0, value);
}

inline function onLevelControl(component, value)
{
    // Macro 2 is typically connected to output gain.
    Synth.setMacroControl(1, value);
}

GainReduction.setControlCallback(onGainReductionControl);
Level.setControlCallback(onLevelControl);

// Startup defaults
GainReduction.setValue(40.0);
Level.setValue(0.0);

// Push defaults through callbacks
onGainReductionControl(GainReduction, GainReduction.getValue());
onLevelControl(Level, Level.getValue());
