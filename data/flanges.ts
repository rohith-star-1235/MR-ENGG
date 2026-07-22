import type { Flange } from "@/types/flange";

const commonClasses = [150, 300, 400, 600, 900, 1500, 2500];

export const flanges: Flange[] = [
  {
    id: "weld-neck", name: "Weld Neck Flange", shortName: "Weld Neck", code: "FL-WN", category: "general",
    connection: "Butt-welded neck", standard: "ASME B16.5 / ASME B16.47", pressureClasses: commonClasses,
    sizeRange: "NPS 1/2 to 24 under ASME B16.5; larger sizes under applicable large-diameter standards",
    pressureUse: "Preferred for high-pressure, high-temperature, severe cyclic and critical process service.", fatigue: "Excellent", cost: "High",
    summary: "A forged flange with a tapered hub that transfers piping loads gradually from the pipe wall into the flange body.",
    applications: ["Critical process and hydrocarbon piping", "High-pressure steam", "Thermal cycling and vibration", "Services requiring butt-weld examination"],
    advantages: ["Best stress distribution among common line flanges", "Full-penetration butt-weld connection", "Suitable for severe pressure-temperature duty"],
    limitations: ["Higher purchase and fabrication cost", "Bore must match pipe wall or approved transition detail", "Requires accurate fit-up and qualified butt welding"],
    inspection: ["Verify material grade, heat number and MTC traceability", "Check bore against pipe schedule and transition requirement", "Inspect bevel, hub taper, facing and bolt-hole condition", "Confirm dimensions, class, facing designation and marking", "Protect the machined face during handling and welding"],
    fieldNotes: ["Never pull misaligned flanges together with bolts", "Confirm flange rotation before completing the weld", "Control weld distortion and check final face alignment", "Use a compatible gasket and bolting set for the selected facing and class"],
    manufacturing: ["Forging", "Heat treatment as specified", "Rough machining", "Bore and hub machining", "Facing and drilling", "NDE / PMI where required", "Marking, preservation and dispatch"],
    failures: [
      { mode: "Hub or weld cracking", cause: "High cyclic stress, poor weld profile or misalignment", prevention: "Correct fit-up, qualified welding and stress review" },
      { mode: "Gasket leakage", cause: "Face damage, uneven preload or unsuitable gasket", prevention: "Inspect facing and apply controlled PCC-1 assembly practices" },
      { mode: "Face distortion", cause: "Welding heat or forced alignment", prevention: "Balanced welding sequence and post-weld dimensional inspection" }
    ],
    relatedStandards: ["ASME B16.5", "ASME B16.47", "ASME B31.3", "ASME PCC-1", "ASTM A105/A105M", "ASME Section IX"]
  },
  {
    id: "slip-on", name: "Slip-On Flange", shortName: "Slip-On", code: "FL-SO", category: "general",
    connection: "Internal and external fillet welds", standard: "ASME B16.5", pressureClasses: [150, 300, 400, 600, 900, 1500], sizeRange: "Standard-controlled by class and edition",
    pressureUse: "Common for low-to-moderate pressure utility and non-severe process service.", fatigue: "Fair", cost: "Low",
    summary: "The pipe passes through the flange bore and is retained by fillet welds on the hub side and inside bore side.",
    applications: ["Cooling water", "Plant air", "Low-pressure utilities", "General non-cyclic piping"],
    advantages: ["Lower initial cost", "Simple fit-up", "Less exact pipe-end preparation than butt welding"],
    limitations: ["Lower fatigue resistance than weld neck", "Two fillet welds are required", "Internal crevice can be undesirable in corrosive service"],
    inspection: ["Verify pipe setback from the flange face", "Check both fillet welds and required weld size", "Inspect flange alignment and face runout", "Confirm facing protection and identification"],
    fieldNotes: ["Do not allow pipe end or weld metal to damage the gasket seating area", "Avoid severe cyclic service unless the design specification permits it", "Check minimum spacing for the internal fillet weld"],
    manufacturing: ["Forging", "Heat treatment", "Machining", "Facing", "Drilling", "Inspection and marking"],
    failures: [{ mode: "Fillet-weld fatigue cracking", cause: "Cyclic bending and stress concentration", prevention: "Use weld neck flange for severe cyclic duty" }, { mode: "Crevice corrosion", cause: "Trapped process fluid at the pipe-to-flange interface", prevention: "Review metallurgy and select another joint form where required" }],
    relatedStandards: ["ASME B16.5", "ASME B31.3", "ASME PCC-1", "ASTM A105/A105M", "ASME Section IX"]
  },
  {
    id: "socket-weld", name: "Socket Weld Flange", shortName: "Socket Weld", code: "FL-SW", category: "general",
    connection: "Socket with external fillet weld", standard: "ASME B16.5", pressureClasses: [150, 300, 400, 600, 900, 1500], sizeRange: "Primarily small-bore applications",
    pressureUse: "Used for selected small-bore high-pressure systems where project specifications permit socket-weld construction.", fatigue: "Good", cost: "Medium",
    summary: "The pipe is inserted into a machined socket, backed off by the required gap and fillet welded externally.",
    applications: ["Small-bore process connections", "Instrument and utility connections", "Selected high-pressure services"],
    advantages: ["Good pipe alignment", "Compact connection", "No butt-weld root protrusion"],
    limitations: ["Crevice remains at the socket", "Not preferred for severe thermal cycling or corrosive crevice service", "Generally restricted by project size limits"],
    inspection: ["Check socket depth and pipe insertion gap", "Inspect fillet-weld profile and size", "Verify bore cleanliness", "Confirm compliance with small-bore project rules"],
    fieldNotes: ["Bottom the pipe and withdraw it by the specified gap before welding", "Do not omit the expansion gap", "Review service restrictions before selection"],
    manufacturing: ["Forging", "Heat treatment", "Socket and bore machining", "Facing", "Drilling", "Inspection and marking"],
    failures: [{ mode: "Socket-root cracking", cause: "No expansion gap or cyclic thermal loading", prevention: "Maintain prescribed gap and avoid unsuitable cyclic duties" }],
    relatedStandards: ["ASME B16.5", "ASME B31.3", "ASME PCC-1", "ASME Section IX"]
  },
  {
    id: "threaded", name: "Threaded Flange", shortName: "Threaded", code: "FL-TH", category: "general",
    connection: "Tapered pipe thread", standard: "ASME B16.5", pressureClasses: [150, 300, 400, 600, 900, 1500], sizeRange: "Standard and project specification controlled",
    pressureUse: "Limited to services where welding is undesirable and threaded construction is allowed by the piping code and line class.", fatigue: "Low", cost: "Medium",
    summary: "A flange connected mechanically to threaded pipe without a pressure-retaining circumferential weld.",
    applications: ["Galvanized piping", "Low-severity water or air service", "Locations where hot work is restricted"],
    advantages: ["No welding required", "Rapid installation", "Useful for selected non-weldable site conditions"],
    limitations: ["Thread leakage and loosening risk", "Poor performance under cyclic loading", "Service and temperature restrictions are common"],
    inspection: ["Verify thread form, engagement and condition", "Check sealant compatibility", "Confirm face orientation after tightening", "Inspect for cracked or over-cut threads"],
    fieldNotes: ["Do not back off the flange merely to achieve bolt-hole alignment", "Avoid excessive sealant", "Follow line-class restrictions without exception"],
    manufacturing: ["Forging", "Heat treatment", "Thread machining", "Facing", "Drilling", "Inspection and marking"],
    failures: [{ mode: "Thread leakage", cause: "Insufficient engagement, damaged threads or unsuitable sealant", prevention: "Correct threading, inspection and approved sealing method" }],
    relatedStandards: ["ASME B16.5", "ASME B1.20.1", "ASME B31.3", "ASME PCC-1"]
  },
  {
    id: "lap-joint", name: "Lap Joint Flange", shortName: "Lap Joint", code: "FL-LJ", category: "general",
    connection: "Loose backing flange used with a stub end", standard: "ASME B16.5", pressureClasses: [150, 300, 400, 600, 900, 1500], sizeRange: "Standard-controlled; used with compatible stub-end geometry",
    pressureUse: "Useful for corrosive alloy systems and joints requiring frequent dismantling or easy bolt-hole alignment.", fatigue: "Fair", cost: "Medium",
    summary: "A non-wetted rotatable backing flange bears against the lap of a separate stub end, which provides the actual sealing face.",
    applications: ["Stainless and alloy piping", "Lined systems", "Frequently dismantled joints", "Alignment-sensitive field connections"],
    advantages: ["Free flange rotation simplifies bolt alignment", "Backing flange may use lower-cost material", "Convenient dismantling"],
    limitations: ["Lower joint rigidity", "Requires a compatible stub end", "Not normally preferred for high external bending loads"],
    inspection: ["Inspect stub-end sealing face", "Verify lap radius compatibility", "Check backing flange bore and free rotation", "Confirm backing and wetted material identification"],
    fieldNotes: ["Select the gasket from the stub-end facing, not the backing flange", "Support heavy piping close to the joint", "Do not mistake backing flange material for process-wetted material"],
    manufacturing: ["Forging", "Heat treatment", "Bore and lap-radius machining", "Drilling", "Inspection and marking"],
    failures: [{ mode: "Stub-end deformation", cause: "High bending load or unsuitable joint support", prevention: "Provide support and verify load suitability" }],
    relatedStandards: ["ASME B16.5", "ASME B16.9", "ASME B31.3", "ASME PCC-1"]
  },
  {
    id: "blind", name: "Blind Flange", shortName: "Blind", code: "FL-BL", category: "closure",
    connection: "Bolted pressure closure", standard: "ASME B16.5 / ASME B16.47", pressureClasses: commonClasses, sizeRange: "Standard-controlled by size and class",
    pressureUse: "Closes a line, valve, nozzle or future connection and can form a hydrotest boundary.", fatigue: "Function-specific", cost: "Varies strongly with size and class",
    summary: "A solid pressure-retaining flange without a bore, designed as a removable bolted closure.",
    applications: ["Line termination", "Equipment nozzles", "Future tie-ins", "Hydrotest and isolation boundaries"],
    advantages: ["Positive removable closure", "Allows later access", "Simple visual inspection of the connection"],
    limitations: ["Very heavy at large size and high class", "Pressure produces significant plate bending", "Removal can be hazardous if pressure is trapped"],
    inspection: ["Verify class, thickness and facing", "Check lifting and handling arrangement", "Inspect gasket seating surface", "Confirm line is depressurized, drained and vented before loosening bolts"],
    fieldNotes: ["Never stand directly in front during first pressurization or opening", "Use an engineered lifting method for large blinds", "Prove zero pressure before removal"],
    manufacturing: ["Forging or approved manufacturing route", "Heat treatment", "Profile machining", "Facing", "Drilling", "Inspection and marking"],
    failures: [{ mode: "Dish deformation", cause: "Pressure load beyond rating or incorrect thickness", prevention: "Verify class and dimensions" }, { mode: "Unsafe release", cause: "Trapped pressure behind blind", prevention: "Vent, drain and positively verify isolation" }],
    relatedStandards: ["ASME B16.5", "ASME B16.47", "ASME B31.3", "ASME PCC-1"]
  },
  {
    id: "reducing", name: "Reducing Flange", shortName: "Reducing", code: "FL-RD", category: "transition",
    connection: "Flanged joint with reduced bore", standard: "Manufacturer / project specification with applicable dimensional standard", pressureClasses: commonClasses, sizeRange: "Project- and manufacturer-controlled",
    pressureUse: "Provides a compact bore transition where hydraulics, stress and equipment geometry justify its use.", fatigue: "Design-dependent", cost: "Medium to high",
    summary: "A flange having a bore smaller than the nominal flange size, creating an immediate area change at the joint.",
    applications: ["Selected equipment nozzles", "Space-limited transitions", "Special pump or instrument connections"],
    advantages: ["Compact transition", "May remove a separate reducer", "Useful where layout length is restricted"],
    limitations: ["Creates local pressure loss and turbulence", "Can increase velocity and erosion risk", "Not a universal replacement for a pipe reducer"],
    inspection: ["Verify inlet and outlet bore dimensions", "Check concentricity and internal profile", "Confirm process and stress approval", "Inspect for sharp edges"],
    fieldNotes: ["Calculate velocity and pressure-drop impact", "Do not select only for space saving", "Confirm the exact drawing and line-class acceptance"],
    manufacturing: ["Forging", "Heat treatment", "Special bore machining", "Facing", "Drilling", "Inspection and marking"],
    failures: [{ mode: "Erosion at transition", cause: "High velocity and abrupt geometry", prevention: "Hydraulic review and smoother transition selection" }],
    relatedStandards: ["ASME B16.5", "ASME B31.3", "Project piping material specification"]
  },
  {
    id: "long-weld-neck", name: "Long Weld Neck Flange", shortName: "Long Weld Neck", code: "FL-LWN", category: "equipment",
    connection: "Integral extended neck with butt-weld end", standard: "Equipment design drawing / applicable flange dimensional basis", pressureClasses: commonClasses, sizeRange: "Design-specific",
    pressureUse: "Primarily used as an equipment nozzle or reinforced high-integrity connection rather than a routine line flange.", fatigue: "Excellent", cost: "High",
    summary: "A forged flange with an extended neck that can form part of a vessel, column, drum or special equipment nozzle.",
    applications: ["Pressure-vessel nozzles", "Columns and drums", "Special equipment connections", "High-integrity branches"],
    advantages: ["Smooth stress transition", "Can provide integral nozzle reinforcement", "Reduces separate neck pieces"],
    limitations: ["Requires equipment-design coordination", "Long lead time and high cost", "Not interchangeable with a standard weld neck flange"],
    inspection: ["Verify neck length, bore and wall profile against equipment drawing", "Inspect transition radii", "Confirm full material traceability", "Review NDE and heat-treatment requirements"],
    fieldNotes: ["Treat as an equipment/nozzle component where applicable", "Check vessel calculations before substitution", "Never replace with a standard weld neck without engineering approval"],
    manufacturing: ["Special forging", "Heat treatment", "Neck and bore machining", "Facing and drilling", "NDE / PMI", "Final dimensional inspection"],
    failures: [{ mode: "Nozzle transition cracking", cause: "High local stress or geometric mismatch", prevention: "Equipment stress analysis and correct profile" }],
    relatedStandards: ["ASME Section VIII", "ASME B16.5", "ASME B31.3", "ASME PCC-1", "Equipment design specification"]
  }
];

export const comparableFlanges = flanges.filter((flange) => flange.category === "general");
