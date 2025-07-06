import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Gamepad2, Map, Palette, Settings, Layout, Loader2, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import cosmicBackground from '@/assets/cosmic-background.jpg';
import dreamConcept1 from '@/assets/dream-concept-1.jpg';
import dreamConcept2 from '@/assets/dream-concept-2.jpg';
import dreamConcept3 from '@/assets/dream-concept-3.jpg';

interface GameConcept {
  plotline: string;
  worldMap: string;
  artStyle: string;
  gameLoop: string;
  uiSketches: string;
}

export default function DreamBuilder() {
  const [gameIdea, setGameIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [concept, setConcept] = useState<GameConcept | null>(null);
  const [inspirationImages, setInspirationImages] = useState<string[]>([]);
  const [generatingImages, setGeneratingImages] = useState(false);
  const { toast } = useToast();

  const generateInspirationImages = async () => {
    if (!gameIdea.trim()) return;
    
    setGeneratingImages(true);
    
    // Extract keywords from game idea for image generation
    const keywords = gameIdea.toLowerCase();
    const themes = [];
    
    if (keywords.includes('horror') || keywords.includes('scary') || keywords.includes('nightmare')) {
      themes.push('horror nightmare realm with twisted dark architecture');
    }
    if (keywords.includes('fantasy') || keywords.includes('magic') || keywords.includes('medieval')) {
      themes.push('fantasy world with magical floating islands and mystical creatures');
    }
    if (keywords.includes('sci-fi') || keywords.includes('space') || keywords.includes('futuristic')) {
      themes.push('futuristic sci-fi landscape with neon lights and cyberpunk aesthetics');
    }
    if (keywords.includes('dream') || keywords.includes('surreal') || keywords.includes('abstract')) {
      themes.push('surreal dreamscape with ethereal floating elements and cosmic void');
    }
    if (keywords.includes('ocean') || keywords.includes('underwater') || keywords.includes('sea')) {
      themes.push('underwater world with bioluminescent creatures and coral cities');
    }
    if (keywords.includes('forest') || keywords.includes('nature') || keywords.includes('jungle')) {
      themes.push('mystical forest with glowing trees and magical creatures');
    }
    
    // Default themes if no specific keywords found
    if (themes.length === 0) {
      themes.push(
        'surreal dreamscape with floating islands in cosmic void',
        'mystical world with ethereal lighting and fantasy elements',
        'atmospheric game environment with unique visual style'
      );
    }
    
    // Ensure we have exactly 3 themes
    while (themes.length < 3) {
      themes.push('creative game world with unique artistic style and atmosphere');
    }
    themes.splice(3); // Keep only first 3
    
    try {
      const imagePromises = themes.map(async (theme, index) => {
        try {
          await generate_image({
            prompt: `${theme}, game concept art style, detailed environment, beautiful lighting, ultra high resolution`,
            width: 512,
            height: 320,
            model: 'flux.schnell',
            target_path: `src/assets/generated-concept-${index + 1}.jpg`
          });
          return `src/assets/generated-concept-${index + 1}.jpg`;
        } catch (error) {
          console.error(`Error generating image ${index + 1}:`, error);
          return [dreamConcept1, dreamConcept2, dreamConcept3][index] || dreamConcept1;
        }
      });
      
      const generatedImages = await Promise.all(imagePromises);
      setInspirationImages(generatedImages);
      
    } catch (error) {
      console.error('Error generating images:', error);
      // Fallback to default images
      setInspirationImages([dreamConcept1, dreamConcept2, dreamConcept3]);
    }
    
    setGeneratingImages(false);
  };

  const generateConcept = async () => {
    if (!gameIdea.trim()) return;
    
    setIsGenerating(true);
    
    // Generate inspiration images first
    await generateInspirationImages();
    
    // Simulate generation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Extract themes and keywords from game idea for dynamic content
    const keywords = gameIdea.toLowerCase();
    const themes = {
      isHorror: keywords.includes('horror') || keywords.includes('scary') || keywords.includes('nightmare'),
      isFantasy: keywords.includes('fantasy') || keywords.includes('magic') || keywords.includes('medieval'),
      isSciFi: keywords.includes('sci-fi') || keywords.includes('space') || keywords.includes('futuristic'),
      isDream: keywords.includes('dream') || keywords.includes('surreal') || keywords.includes('lucid'),
      hasTime: keywords.includes('time') || keywords.includes('temporal') || keywords.includes('rewind'),
      isPuzzle: keywords.includes('puzzle') || keywords.includes('solve') || keywords.includes('challenge'),
      isOcean: keywords.includes('ocean') || keywords.includes('underwater') || keywords.includes('sea')
    };
    
    // Generate dynamic world map based on themes
    let worldMapContent = '';
    if (themes.isHorror) {
      worldMapContent = `**World Map Design: The Fractured Realms - A Horror Landscape Architecture**

**Central Hub: The Nightmare Nexus**
A decrepit asylum floating in an endless void of shadow and whispers. This serves as the player's base where fragments of sanity can be restored. The asylum features:
- **The Shattered Mirror Hall**: Reflects different nightmare realms, each more terrifying than the last
- **The Memory Ward**: Padded rooms containing suppressed traumatic memories
- **The Surgery Theater**: Where the player can "operate" on their fears and phobias
- **The Basement Archives**: Contains case files of other victims who never escaped

**Realm 1: The Suburban Hellscape**
A twisted version of childhood neighborhoods where houses breathe and streets lead in impossible directions:
- **The Childhood Home**: Rooms that age and decay as traumatic memories surface
- **The School of Screams**: Hallways that stretch infinitely, classrooms filled with shadow children
- **The Playground of Bones**: Swing sets that move on their own, slides that descend into darkness

**Realm 2: The Industrial Nightmare**
Massive factories and machinery that process fear itself:
- **The Fear Factory**: Conveyor belts carrying bottled screams and crystallized terror
- **The Boiler Room of Regrets**: Steam pipes that whisper past mistakes
- **The Executive Penthouse**: Where the Nightmare CEO resides, orchestrating all fears`;
    } else if (themes.isFantasy) {
      worldMapContent = `**World Map Design: The Enchanted Realms - A Fantasy World Architecture**

**Central Hub: The Arcane Sanctuary**
A floating tower of crystalline magic suspended between dimensions. This mystical spire serves as the player's magical base:
- **The Spell Forge**: Where new magical abilities are crafted and enhanced
- **The Divination Pool**: Reveals glimpses of other realms and hidden secrets
- **The Familiar's Roost**: Home to magical companions and spirit guides
- **The Portal Chamber**: Swirling gateways to different magical dimensions

**Realm 1: The Evergreen Expanse**
Ancient forests where trees are millennia old and magic flows like rivers:
- **The Whispering Grove**: Trees that share ancient wisdom and forgotten spells
- **The Fairy Crossing**: Bridges made of moonbeams connecting treetop villages
- **The Dragon's Glen**: A clearing where time moves differently, guarded by ancient wyrms

**Realm 2: The Crystal Caverns**
Underground networks of gemstone formations that amplify magical energy:
- **The Singing Crystals**: Caverns that resonate with musical magic
- **The Underground Lake**: Waters that reflect not your image, but your soul
- **The Throne of Elements**: Where the four elemental kings hold court`;
    } else {
      worldMapContent = `**World Map Design: The Consciousness Continuum - A Unique Dream Architecture**

**Central Hub: The Mind's Observatory**  
A crystalline structure floating in the space between thoughts, serving as the nexus of all mental activity:
- **The Idea Incubator**: Where new concepts are born and nurtured
- **The Memory Bank**: Vast halls storing every experience and emotion
- **The Decision Tree**: A living structure that branches with every choice made
- **The Dream Portal**: Gateway to subconscious realms and hidden desires

**Layer 1: The Familiar Territory**
Represents known experiences and comfort zones, but with subtle impossibilities:
- **The Hometown Paradox**: Streets that connect in impossible ways, buildings that exist in multiple time periods
- **The Social Sphere**: Cafes and gathering places where conversations shape reality
- **The Comfort Bubble**: Safe spaces that expand or contract based on confidence levels

**Layer 2: The Unknown Frontier**
Represents growth, learning, and stepping into the unfamiliar:
- **The Library of What-Ifs**: Books containing all the paths not taken
- **The Skill Gardens**: Where abilities grow like plants, requiring nurturing and care
- **The Challenge Mountains**: Peaks that represent personal goals and aspirations`;
    }
    
    // Generate dynamic art style based on themes
    let artStyleContent = '';
    if (themes.isHorror) {
      artStyleContent = `**Visceral Terror Aesthetic: "Psychological Realism with Nightmare Distortion"**

**Overall Visual Philosophy:**
A grounding in photorealistic environments that gradually distort into nightmarish impossibilities. The art style shifts from familiar comfort to unsettling wrongness, using uncanny valley effects to create deep psychological discomfort.

**Color Psychology & Palette:**
- **Safe Zones**: Warm, muted colors that gradually drain of saturation as danger approaches
- **Transition Areas**: Sickly greens and jaundiced yellows that make everything look diseased
- **Nightmare Cores**: Deep crimsons and pitch blacks with occasional stark white highlights for jump scares
- **Memory Fragments**: Sepia tones that flicker between normal and grotesquely distorted

**Lighting Design Philosophy:**
- **Flickering Fluorescents**: Unstable lighting that creates moving shadows and blind spots
- **Candle Horror**: Warm light sources that create dancing, threatening shadows
- **Strobe Panic**: Sudden bright flashes that reveal horrors in the darkness
- **Void Illumination**: Light that seems to be absorbed by certain areas, creating impossible darkness`;
    } else if (themes.isSciFi) {
      artStyleContent = `**Cybernetic Dream Aesthetic: "Neo-Digital Surrealism"**

**Overall Visual Philosophy:**
A fusion of sleek digital interfaces with organic dream logic, creating environments that feel both technologically advanced and mysteriously alive. Data streams become rivers, code becomes architecture.

**Color Psychology & Palette:**
- **Interface Zones**: Electric blues, neon greens, and holographic purples representing digital clarity
- **Data Streams**: Flowing rivers of light in cyan and magenta that carry information
- **System Errors**: Glitchy reds and static whites that indicate corrupted memories or damaged code
- **Deep Net**: Dark blues and blacks punctuated by nodes of brilliant white representing consciousness

**Lighting Design Philosophy:**
- **Holographic Illumination**: Light that can be touched and manipulated like solid objects
- **Data Glow**: Information that emits its own light, creating reading lamps from pure knowledge
- **System Lighting**: Environmental elements that pulse with the rhythm of digital heartbeats
- **Quantum Flicker**: Light that exists in multiple states simultaneously, creating ethereal effects`;
    } else {
      artStyleContent = `**Ethereal Consciousness Aesthetic: "Lucid Impressionism"**

**Overall Visual Philosophy:**
A hybrid approach combining photorealistic environments with impressionistic dream distortions, creating a visual language that feels both familiar and otherworldly. The art style evolves dynamically based on the player's emotional state and level of awareness.

**Color Psychology & Palette:**
- **Conscious States**: Soft pearl whites, gentle silvers, and crystalline blues representing clarity and control
- **Emotional Layers**: Colors that shift and blend based on feelings - warm oranges for joy, cool purples for sadness
- **Memory Zones**: Vintage film tones with sepia and golden hour lighting evoking nostalgia
- **Abstract Realms**: Vibrant, saturated colors that defy natural logic - electric teals, sunset magentas

**Lighting Design Philosophy:**
- **Volumetric Dream Light**: All light sources have visible substance - beams that can be walked through
- **Emotional Illumination**: Light that changes color and intensity based on psychological state
- **Temporal Lighting**: Different eras of lighting coexisting in the same space
- **Consciousness Flares**: Moments of realization create brilliant light bursts revealing hidden truths`;
    }
    
    // Mock concept generation with dynamic content
    const mockConcept: GameConcept = {
      plotline: `**The Dreamer's Paradox: A Journey Through Consciousness**

You embody Luna, a gifted lucid dreamer whose ability to manipulate time within dreamscapes becomes both her greatest power and her most dangerous curse. After a traumatic event fragments her consciousness, Luna finds herself trapped in an endless cycle of recursive nightmares, each layer deeper and more treacherous than the last.

**Act 1: The Shallow Sleep - "Echoes of Memory"**
Luna awakens in a distorted version of her childhood home, where time flows like liquid mercury. Furniture phases in and out of existence, family photos show different faces each time she looks, and conversations with shadowy figures can be rewound to reveal hidden meanings. She discovers that by manipulating time—rewinding moments, pausing reality, or fast-forwarding through painful memories—she can uncover fragments of her repressed past. Each solved temporal puzzle unlocks a memory fragment, slowly revealing the trauma that shattered her mind.

**Key Mechanics:** Time rewind (conversations replay with new dialogue options), temporal freeze (examine objects that change when time flows), memory reconstruction (piece together fragmented scenes).

**Act 2: The Deep Dive - "Fractured Timelines"**
As Luna descends into her subconscious's deeper layers, reality becomes increasingly unstable. She gains the ability to split timelines, creating parallel dream sequences where different choices lead to different outcomes. The environments become more surreal—schools where classrooms exist in multiple time periods simultaneously, libraries where books rewrite themselves, and mirrors that show alternate versions of her life. Luna must solve increasingly complex puzzles that require her to coordinate actions across multiple timelines, often sacrificing one version of herself to save another.

**Key Mechanics:** Timeline splitting (create parallel puzzle solutions), quantum decision trees (choices in one timeline affect others), temporal echoes (past actions influence present puzzles).

**Act 3: The Nightmare's Core - "The Dreamer's Awakening"**
In the deepest layer of her psyche, Luna confronts the Paradox—a manifestation of her fractured consciousness that controls time itself. Here, past, present, and future exist simultaneously. Luna must use every temporal ability she's mastered while navigating a constantly shifting reality where the rules of time break down completely. The final challenge isn't just escaping the nightmare, but choosing whether to heal her trauma or remain in the comfort of her dream world forever.

**Key Mechanics:** Temporal chaos (time flows unpredictably), reality anchoring (stabilize fragments of truth), consciousness integration (merge all timeline versions of Luna).

**Themes:** The game explores deep psychological themes including trauma processing, the nature of memory and identity, the courage required for healing, and the philosophical question of whether ignorance is truly bliss. It challenges players to confront difficult truths while offering hope for recovery and growth.`,
      
      worldMap: `**World Map Design: The Dreamer's Paradox - A Multi-Dimensional Dream Architecture**

**Central Hub: The Observatory of Consciousness**
The game's main hub exists as a floating crystalline observatory suspended in a cosmic void. This is Luna's "safe space" where her conscious mind maintains control. The observatory features:
- **The Dream Mirror**: A massive, ethereal mirror that serves as the level selection interface, showing swirling portals to different dream layers
- **The Memory Gallery**: Walls lined with floating picture frames that fill with recovered memories as players progress
- **The Temporal Workshop**: Where Luna can experiment with and upgrade her time manipulation abilities
- **The Journal Sanctum**: A library containing all collected story fragments, concept art, and character development notes

**Layer 1: The Nostalgic Realm (Shallow Sleep - Comfort Zone)**
This layer represents Luna's conscious memories and familiar spaces, but with subtle dream-logic distortions:
- **Childhood Home**: A Victorian-style house where rooms exist in different time periods. The kitchen shows family dinners from various ages, the living room has furniture that phases between different decades, and the attic contains toys that move on their own.
- **The Garden of Echoes**: An ever-changing backyard where conversations with family members can be rewound, each replay revealing deeper emotional truths.
- **The Basement of Beginnings**: The entrance to deeper dreams, featuring a spiral staircase that descends infinitely, with each step representing a deeper layer of consciousness.

**Layer 2: The Scholastic Dimension (Deep Sleep - Growth and Trauma)**
Representing Luna's formative experiences and learning, where logic begins to break down:
- **The Infinite Academy**: A school that exists across multiple time periods, with classrooms from elementary through college simultaneously present.
- **The Library of Possibilities**: A vast library where books rewrite themselves based on Luna's choices, and reading about events can change them in other timelines.
- **The Cafeteria of Social Dynamics**: Where Luna relives social interactions, but can now see the emotional undercurrents and unspoken thoughts of others.
- **The Principal's Office of Judgment**: A boss encounter where Luna faces her internalized criticism and perfectionism.
- **The Gymnasium of Challenges**: Where Luna confronts her physical and emotional limitations through symbolic trials.

**Layer 3: The Abstract Plane (REM Sleep - Creativity and Fear)**
Pure symbolic representation where dream logic dominates:
- **The City of Metaphors**: An ever-shifting urban landscape where buildings represent emotions and streets are pathways between different aspects of Luna's personality.
- **The Forest of Symbols**: A dark woodland where trees are memories and their shadows are fears, requiring Luna to navigate by the light of her own inner wisdom.
- **The Ocean of the Unconscious**: A vast sea containing islands of repressed memories, accessible only by riding temporal currents.

**Layer 4: The Nightmare Core (Deep Unconscious - Primal Fears)**
The darkest realm where Luna's deepest traumas reside:
- **The Shattered Palace**: Luna's idealized self-image, now broken and twisted, serving as a maze where each room contains a different fear or regret.
- **The Void of Abandonment**: A black space punctuated by floating islands of memory, where Luna must leap between moments of connection to avoid falling into despair.
- **The Mirror Labyrinth**: The final area where Luna faces infinite reflections of herself—past, present, future, and alternate versions from different choices.

**Interconnecting Elements:**
- **Temporal Vortexes**: Swirling portals of light and shadow that connect different layers and time periods
- **Memory Bridges**: Gossamer walkways that appear when Luna successfully resolves emotional conflicts
- **Dream Logic Transitions**: Seamless shifts between locations that follow emotional rather than physical geography
- **Consciousness Currents**: Visible streams of thought and emotion that players can follow to discover hidden areas
- **Time Anchors**: Stable points in each realm that serve as save points and fast travel locations

**Dynamic Elements:**
- **Seasonal Cycles**: Each realm shifts through symbolic seasons representing different emotional states
- **Tidal Effects**: The influence of Luna's waking emotions affects the dream world's stability and accessibility
- **Echo Chambers**: Areas where past choices create reverberations that open new paths or close others
- **Lucidity Zones**: Special areas where Luna has maximum control and can reshape the environment`,
      
      artStyle: `**Ethereal Dreamscape Aesthetic: "Lucid Impressionism"**

**Overall Visual Philosophy:** 
A hybrid approach combining photorealistic environments with impressionistic dream distortions, creating a visual language that feels both familiar and otherworldly. The art style evolves as Luna descends deeper into her subconscious, becoming more abstract and symbolic.

**Color Psychology & Palette:**
- **Conscious Layer (Observatory Hub)**: Soft pearl whites, gentle silver, and crystalline blues representing clarity and control
- **Nostalgic Layer**: Warm sepia tones, golden hour lighting, and vintage film grain effects evoking comfort and memory
- **Scholastic Layer**: Cool academic blues and greens with warm yellow accents from desk lamps and sunlit windows
- **Abstract Layer**: Vibrant, saturated colors that shift and blend—deep purples, electric teals, and sunset oranges representing pure emotion
- **Nightmare Core**: Stark contrasts between pitch black voids and brilliant, almost blinding whites, with occasional blood-red accents for trauma markers

**Lighting Design Philosophy:**
- **Volumetric Dream Light**: All light sources have visible "substance"—beams that can be walked through, shadows that have texture
- **Emotional Illumination**: Light color and intensity change based on Luna's emotional state and proximity to memories
- **Temporal Lighting**: Different time periods within the same space are lit with era-appropriate lighting (candles, gas lamps, fluorescents, LEDs)
- **Consciousness Flares**: Moments of realization create brief, brilliant light bursts that reveal hidden details

**Texture and Material Innovation:**
- **Memory Fabric**: Surfaces that shimmer and show glimpses of past events when touched by light
- **Temporal Glass**: Transparent surfaces that show different time periods depending on viewing angle
- **Emotional Architecture**: Buildings and structures that breathe, pulse, and shift based on the emotional weight of memories they contain
- **Consciousness Crystallization**: Important moments and realizations manifest as crystal formations with internal light

**Character Design Philosophy:**

**Luna (The Dreamer):**
- **Physical Evolution**: Her appearance subtly changes between layers—more solid and defined in conscious areas, more ethereal and translucent in deeper dreams
- **Hair Dynamics**: Hair that moves independently, sometimes defying gravity, with strands that occasionally turn into streams of light or shadow
- **Eye Reflection System**: Her eyes reflect not just light, but memories, showing glimpses of different time periods and emotional states
- **Clothing Transformation**: Outfits that morph to match each dream layer—school clothes in academic areas, pajamas in comfort zones, armor in nightmare realms

**Shadow Figures (Memory Echoes):**
- **Temporal Transparency**: Bodies that exist in multiple time states simultaneously, with past and future selves visible as overlapping silhouettes
- **Clockwork Hearts**: Visible internal mechanisms representing the emotional rhythms and patterns of relationships
- **Fragmented Communication**: Speech bubbles that break apart and reassemble, showing how memory distorts conversations
- **Emotional Auras**: Color-coded glows that reveal the emotional tone of each interaction

**Environmental Character:**
- **Living Architecture**: Buildings that breathe, walls that pulse with heartbeat rhythms, and doors that appear only when emotionally ready to enter
- **Temporal Weathering**: Objects showing their age across multiple time periods simultaneously—a chair that's both new and antique
- **Memory Moss**: Organic growth on surfaces that glows when touched, revealing stored memories in that location
- **Gravity Defiance**: Floating objects, inverted rooms, and impossible architectural geometries that follow dream logic rather than physics

**Visual Effects Systems:**

**Time Manipulation Visualizations:**
- **Rewind Echoes**: Multiple ghostly afterimages showing the path of rewound actions, with increasing transparency for older states
- **Pause Crystallization**: When time stops, everything except interactive elements takes on a crystal-like, frozen appearance with visible faceting
- **Fast-Forward Trails**: Streaking particle effects and motion blur that leaves luminous trails showing accelerated movement
- **Timeline Splits**: Reality fractures like broken glass, with each shard showing a different timeline possibility

**Memory Integration Effects:**
- **Recollection Blooms**: When memories are recovered, they manifest as flowering light patterns that integrate into the environment
- **Trauma Shadows**: Dark, smoke-like effects that follow traumatic memories, gradually dissipating as they're processed
- **Healing Radiance**: Warm, golden light that spreads through areas where emotional wounds have been addressed
- **Connection Threads**: Visible energy lines that connect related memories and experiences across different dream layers

**Atmospheric Enhancements:**
- **Consciousness Particles**: Tiny motes of light that float through the air, clustering around important objects and memories
- **Emotional Weather**: Environmental conditions that reflect psychological states—storm clouds for turmoil, gentle rain for sadness, aurora effects for wonder
- **Dream Fog**: Misty effects that reveal or conceal elements based on Luna's emotional readiness to confront them
- **Lucidity Halos**: Special effects that appear around objects Luna can directly control, growing stronger as her dream awareness increases

**Technical Innovation:**
- **Shader Responsiveness**: Materials that respond to player actions and emotional states through advanced shader programming
- **Procedural Memory Generation**: Environmental details that generate based on player choices and psychological profiles
- **Adaptive Symbolism**: Visual metaphors that adapt to individual player experiences and cultural backgrounds
- **Biometric Integration**: Optional heart rate and stress level monitoring to influence visual intensity and color temperature`,

      gameLoop: `**Core Game Loop:**

1. **Exploration Phase** (30-60 seconds)
   - Player navigates dream environment
   - Discovers temporal anomalies and NPCs
   - Identifies puzzle elements

2. **Puzzle Discovery** (15-30 seconds)
   - Temporal puzzle is revealed
   - Player analyzes the time-based challenge
   - Multiple solution approaches become apparent

3. **Time Manipulation** (60-120 seconds)
   - Player experiments with time powers
   - Rewind, pause, or fast-forward elements
   - Observe consequences of temporal changes

4. **Solution Implementation** (30-45 seconds)
   - Execute the discovered solution
   - Watch environmental changes unfold
   - Progress story through resolved timeline

5. **Narrative Progression** (15-30 seconds)
   - Story beats advance
   - New memories/trauma elements revealed
   - Transition to next dream layer or area

**Meta Loop:** Complete 3-5 puzzle sequences → Boss encounter with major temporal challenge → Story revelation → Descend to deeper dream layer`,

      uiSketches: `**UI/UX Design Specifications**

**Main Menu Interface:**
- Ethereal floating title with animated particles
- Glowing "New Dream" button with pulsing effect
- Load game shows as "Resume Dream" with soft glow
- Settings accessed via floating gear icon

**Gameplay HUD:**
- Time manipulation wheel in bottom-right corner
- Health/sanity bar represented as Luna's reflection clarity
- Inventory appears as floating memory fragments
- Minimal UI to maintain immersion

**Time Control Interface:**
- Circular time dial with rewind/pause/fast-forward sections
- Visual feedback shows ghostly trails for affected objects
- Timeline scrubber at bottom shows current temporal state
- Quick-select buttons for common time actions

**Dialogue System:**
- Translucent speech bubbles with ethereal borders
- Character portraits show emotional states through lighting
- Text appears with typewriter effect synchronized to time flow
- Memory fragments float around important conversations

**Menu & Inventory:**
- Dream journal as main menu interface
- Pages flip with supernatural wind effects
- Items appear as glowing temporal artifacts
- Skill tree shows as branching constellation map`
    };
    
    setConcept(mockConcept);
    setIsGenerating(false);
  };

  const handleSaveToPDF = async () => {
    if (!concept) {
      toast({
        title: "No content to export",
        description: "Please generate a game concept first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      let yPosition = margin;
      
      // Title
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Game Design Document', margin, yPosition);
      yPosition += 15;
      
      // Game idea input
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Original Game Idea:', margin, yPosition);
      yPosition += 8;
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const splitGameIdea = pdf.splitTextToSize(gameIdea, pageWidth - 2 * margin);
      pdf.text(splitGameIdea, margin, yPosition);
      yPosition += splitGameIdea.length * 5 + 10;
      
      // Plotline
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Plotline & Narrative:', margin, yPosition);
      yPosition += 8;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const splitPlotline = pdf.splitTextToSize(concept.plotline, pageWidth - 2 * margin);
      pdf.text(splitPlotline, margin, yPosition);
      yPosition += splitPlotline.length * 4 + 10;
      
      // Add new page if needed
      if (yPosition > pdf.internal.pageSize.getHeight() - 40) {
        pdf.addPage();
        yPosition = margin;
      }
      
      // World Map
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('World Map & Environment:', margin, yPosition);
      yPosition += 8;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const splitWorldMap = pdf.splitTextToSize(concept.worldMap, pageWidth - 2 * margin);
      pdf.text(splitWorldMap, margin, yPosition);
      yPosition += splitWorldMap.length * 4 + 10;
      
      // Art Style
      if (yPosition > pdf.internal.pageSize.getHeight() - 40) {
        pdf.addPage();
        yPosition = margin;
      }
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Art Style & Visual Direction:', margin, yPosition);
      yPosition += 8;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const splitArtStyle = pdf.splitTextToSize(concept.artStyle, pageWidth - 2 * margin);
      pdf.text(splitArtStyle, margin, yPosition);
      yPosition += splitArtStyle.length * 4 + 10;
      
      // Game Loop
      if (yPosition > pdf.internal.pageSize.getHeight() - 40) {
        pdf.addPage();
        yPosition = margin;
      }
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Game Loop & Mechanics:', margin, yPosition);
      yPosition += 8;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const splitGameLoop = pdf.splitTextToSize(concept.gameLoop, pageWidth - 2 * margin);
      pdf.text(splitGameLoop, margin, yPosition);
      yPosition += splitGameLoop.length * 4 + 10;
      
      // UI Sketches
      if (yPosition > pdf.internal.pageSize.getHeight() - 40) {
        pdf.addPage();
        yPosition = margin;
      }
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('UI/UX Design & Interface:', margin, yPosition);
      yPosition += 8;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const splitUISketeches = pdf.splitTextToSize(concept.uiSketches, pageWidth - 2 * margin);
      pdf.text(splitUISketeches, margin, yPosition);
      
      // Save the PDF
      pdf.save('game-design-document.pdf');
      
      toast({
        title: "PDF Exported Successfully!",
        description: "Your game design document has been saved as a PDF.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Export Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportToEngine = (engine: string) => {
    toast({
      title: `Export to ${engine}`,
      description: "This feature will be available in a future update. PDF export is currently available!",
    });
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${cosmicBackground})` }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-pulse-glow" />
            <h1 className="text-5xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              DreamBuilder
            </h1>
            <Gamepad2 className="h-8 w-8 text-accent animate-float" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your wildest game ideas into comprehensive design documents. 
            Describe your dream game and watch it come to life.
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-8 bg-gradient-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Describe Your Dream Game
            </CardTitle>
            <CardDescription>
              Be as creative and detailed as you want. Think themes, mechanics, story, atmosphere...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Game Inspiration Gallery */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">
                Game Inspiration Gallery {generatingImages && <span className="text-primary">(Generating...)</span>}
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {(inspirationImages.length > 0 ? inspirationImages : [dreamConcept1, dreamConcept2, dreamConcept3]).map((image, index) => (
                  <div key={index} className="relative group cursor-pointer">
                    <img 
                      src={image} 
                      alt={`Game concept inspiration ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg border border-primary/20 group-hover:border-primary/40 transition-colors"
                      onClick={() => {
                        const inspirationTexts = [
                          'A surreal dream adventure where players navigate floating islands in cosmic voids, manipulating reality through lucid dreaming powers...',
                          'A psychological thriller about lucid dreaming with time manipulation mechanics, where memories fragment and reality shifts with each dream layer...',
                          'A horror-adventure through nightmare realms where players confront psychological fears while navigating twisted dream architecture and temporal anomalies...'
                        ];
                        setGameIdea(gameIdea + (gameIdea ? '\n\n' : '') + inspirationTexts[index]);
                      }}
                    />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="text-xs text-primary font-medium">
                        {index === 0 ? 'Dream World' : index === 1 ? 'Lucid Dream' : 'Nightmare'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Click on any image to add inspiration to your game idea</p>
            </div>
            
            <Textarea
              placeholder="Example: A horror game where you can control time and solve puzzles in dreams..."
              value={gameIdea}
              onChange={(e) => setGameIdea(e.target.value)}
              className="min-h-32 bg-background/50 border-primary/20 focus:border-primary/40"
            />
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">Horror</Badge>
              <Badge variant="secondary">Time Control</Badge>
              <Badge variant="secondary">Puzzle</Badge>
              <Badge variant="secondary">Dreams</Badge>
            </div>
            <Button 
              onClick={generateConcept}
              disabled={!gameIdea.trim() || isGenerating}
              className="w-full"
              variant="cosmic"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Weaving Your Dream...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Game Concept
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {concept && (
          <Tabs defaultValue="plotline" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-muted/20 backdrop-blur-sm">
              <TabsTrigger value="plotline" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Plotline
              </TabsTrigger>
              <TabsTrigger value="worldmap" className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                World Map
              </TabsTrigger>
              <TabsTrigger value="artstyle" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Art Style
              </TabsTrigger>
              <TabsTrigger value="gameloop" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Game Loop
              </TabsTrigger>
              <TabsTrigger value="ui" className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                UI Sketches
              </TabsTrigger>
            </TabsList>

            <TabsContent value="plotline">
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Game Plotline & Narrative
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-foreground">
                      {concept.plotline}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="worldmap">
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-accent" />
                    World Map & Environment Design
                  </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-foreground">
                    {concept.worldMap}
                  </div>
                </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="artstyle">
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    Art Style & Visual Direction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-foreground">
                    {concept.artStyle}
                  </div>
                </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gameloop">
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-accent" />
                    Game Loop Logic & Mechanics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-foreground">
                      {concept.gameLoop}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ui">
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="h-5 w-5 text-primary" />
                    UI/UX Design & Interface Sketches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-foreground">
                    {concept.uiSketches}
                  </div>
                </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-nebula border-accent/20 text-center">
          <CardContent className="py-8">
            <h3 className="text-2xl font-bold mb-4 text-white">Ready to Build Your Dream Game?</h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Export your concept to Unity, Unreal Engine, or your favorite game development platform. 
              Turn your dreams into playable reality.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                variant="dream" 
                size="lg"
                onClick={() => handleExportToEngine('Unity')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export to Unity
              </Button>
              <Button 
                variant="dream" 
                size="lg"
                onClick={() => handleExportToEngine('Unreal Engine')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export to Unreal
              </Button>
              <Button 
                variant="dream" 
                size="lg"
                onClick={handleSaveToPDF}
                disabled={!concept}
              >
                <FileText className="h-4 w-4 mr-2" />
                Save as PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}