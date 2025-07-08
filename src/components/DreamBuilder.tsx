import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Gamepad2, Map, Palette, Settings, Layout, Loader2, Download, FileText, Brain, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import cosmicBackground from '@/assets/cosmic-background.jpg';
import dreamConcept1 from '@/assets/dream-concept-1.jpg';
import dreamConcept2 from '@/assets/dream-concept-2.jpg';
import dreamConcept3 from '@/assets/dream-concept-3.jpg';
import horrorConcept from '@/assets/horror-concept.jpg';
import fantasyConcept from '@/assets/fantasy-concept.jpg';
import dreamConcept from '@/assets/dream-concept.jpg';

interface GameConcept {
  plotline: string;
  worldMap: string;
  artStyle: string;
  gameLoop: string;
  uiSketches: string;
}

interface GDDTemplate {
  gameTitle: string;
  gameGenre: string;
  inspiration: string;
  oneLinerPitch: string;
  setting: string;
  worldStructure: string;
  loreBackstory: string;
  factionsCultures: string;
  mainStoryline: string;
  mainCharacters: string;
  supportingCharacters: string;
  antagonist: string;
  coreGameplayLoop: string;
  combatMechanics: string;
  explorationMovement: string;
  inventoryProgression: string;
  multiplayerMode: string;
  uniqueFeatures: string;
  artStyle: string;
  colorPalette: string;
  uiuxConcepts: string;
  characterEnvironmentDesign: string;
  musicGenre: string;
  soundDesign: string;
  voiceActing: string;
  playerProgression: string;
  achievementsTrophies: string;
  replayValue: string;
  innovationElement: string;
  targetPlatforms: string;
  monetizationModel: string;
  onlineOfflineCapabilities: string;
  targetAudience: string;
  accessibilityConsiderations: string;
}

export default function DreamBuilder() {
  const [gameIdea, setGameIdea] = useState('');
  const [inputMode, setInputMode] = useState<'freeform' | 'template'>('freeform');
  const [gddTemplate, setGDDTemplate] = useState<GDDTemplate>({
    gameTitle: '',
    gameGenre: '',
    inspiration: '',
    oneLinerPitch: '',
    setting: '',
    worldStructure: '',
    loreBackstory: '',
    factionsCultures: '',
    mainStoryline: '',
    mainCharacters: '',
    supportingCharacters: '',
    antagonist: '',
    coreGameplayLoop: '',
    combatMechanics: '',
    explorationMovement: '',
    inventoryProgression: '',
    multiplayerMode: '',
    uniqueFeatures: '',
    artStyle: '',
    colorPalette: '',
    uiuxConcepts: '',
    characterEnvironmentDesign: '',
    musicGenre: '',
    soundDesign: '',
    voiceActing: '',
    playerProgression: '',
    achievementsTrophies: '',
    replayValue: '',
    innovationElement: '',
    targetPlatforms: '',
    monetizationModel: '',
    onlineOfflineCapabilities: '',
    targetAudience: '',
    accessibilityConsiderations: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [concept, setConcept] = useState<GameConcept | null>(null);
  const [inspirationImages, setInspirationImages] = useState<string[]>([]);
  const [generatingImages, setGeneratingImages] = useState(false);
  const { toast } = useToast();

  const generateInspirationImages = async () => {
    if (!gameIdea.trim()) return;
    
    setGeneratingImages(true);
    
    try {
      // Extract keywords from game idea for image generation
      const keywords = gameIdea.toLowerCase();
      const themes = [];
      
      if (keywords.includes('horror') || keywords.includes('scary') || keywords.includes('nightmare')) {
        themes.push('cinematic horror nightmare realm with twisted gothic architecture, eerie shadows, dramatic lighting, mist, ultra detailed game concept art, 16:9 aspect ratio');
      }
      if (keywords.includes('fantasy') || keywords.includes('magic') || keywords.includes('medieval')) {
        themes.push('epic fantasy world with floating islands and mystical creatures, ethereal lighting, magical atmosphere, cinematic composition, ultra detailed game concept art, 16:9 aspect ratio');
      }
      if (keywords.includes('sci-fi') || keywords.includes('space') || keywords.includes('futuristic')) {
        themes.push('futuristic sci-fi cyberpunk landscape with neon lights and holographic displays, cinematic lighting, atmospheric, ultra detailed game concept art, 16:9 aspect ratio');
      }
      if (keywords.includes('dream') || keywords.includes('surreal') || keywords.includes('abstract')) {
        themes.push('surreal dreamscape with ethereal floating elements in cosmic void, psychedelic colors, cinematic composition, ultra detailed game concept art, 16:9 aspect ratio');
      }
      if (keywords.includes('ocean') || keywords.includes('underwater') || keywords.includes('sea')) {
        themes.push('underwater world with bioluminescent creatures and coral cities, deep blue atmosphere, cinematic lighting, ultra detailed game concept art, 16:9 aspect ratio');
      }
      if (keywords.includes('forest') || keywords.includes('nature') || keywords.includes('jungle')) {
        themes.push('mystical forest with glowing trees and magical creatures, enchanted atmosphere, cinematic lighting, ultra detailed game concept art, 16:9 aspect ratio');
      }
      
      // Default themes if no specific keywords found
      if (themes.length === 0) {
        themes.push(
          'surreal dreamscape with floating islands in cosmic void, ethereal lighting, cinematic composition, ultra detailed game concept art, 16:9 aspect ratio',
          'mystical world with ethereal lighting and fantasy elements, magical atmosphere, cinematic, ultra detailed game concept art, 16:9 aspect ratio',
          'atmospheric game environment with unique visual style and cinematic composition, dramatic lighting, ultra detailed game concept art, 16:9 aspect ratio'
        );
      }
      
      // Ensure we have exactly 3 themes
      while (themes.length < 3) {
        themes.push('creative game world with unique artistic style and atmospheric lighting, cinematic composition, ultra detailed game concept art, 16:9 aspect ratio');
      }
      themes.splice(3); // Keep only first 3
      
      // Select appropriate images based on themes detected
      const dynamicImages = [];
      
      // Map themes to appropriate concept images
      for (const theme of themes) {
        if (theme.includes('horror') || theme.includes('nightmare')) {
          dynamicImages.push(horrorConcept);
        } else if (theme.includes('fantasy') || theme.includes('mystical')) {
          dynamicImages.push(fantasyConcept);
        } else if (theme.includes('dream') || theme.includes('surreal')) {
          dynamicImages.push(dreamConcept);
        } else {
          // Cycle through available concept images
          const fallbackImages = [horrorConcept, fantasyConcept, dreamConcept];
          dynamicImages.push(fallbackImages[dynamicImages.length % fallbackImages.length]);
        }
      }
      
      // Ensure we have exactly 3 images
      while (dynamicImages.length < 3) {
        const conceptImages = [horrorConcept, fantasyConcept, dreamConcept];
        dynamicImages.push(conceptImages[dynamicImages.length % conceptImages.length]);
      }
      
      setInspirationImages(dynamicImages.slice(0, 3));
      
      toast({
        title: "Dynamic Gallery Generated!",
        description: "Cinematic concepts created based on your game idea themes.",
      });
      
    } catch (error) {
      console.error('Error generating inspiration images:', error);
      setInspirationImages([dreamConcept1, dreamConcept2, dreamConcept3]);
      toast({
        title: "Using Default Gallery",
        description: "Error generating dynamic images - using fallback concepts.",
        variant: "destructive",
      });
    }
    
    setGeneratingImages(false);
  };

  const generateConcept = async () => {
    if (inputMode === 'freeform' && !gameIdea.trim()) return;
    if (inputMode === 'template' && !gddTemplate.gameTitle.trim()) return;
    
    setIsGenerating(true);
    
    // Generate inspiration images first (for freeform mode)
    if (inputMode === 'freeform') {
      await generateInspirationImages();
    }
    
    // Simulate generation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Extract themes and keywords from game idea for dynamic content
    const sourceText = inputMode === 'freeform' ? gameIdea : 
      `${gddTemplate.gameTitle} ${gddTemplate.gameGenre} ${gddTemplate.oneLinerPitch} ${gddTemplate.setting} ${gddTemplate.mainStoryline} ${gddTemplate.uniqueFeatures} ${gddTemplate.innovationElement}`;
    const keywords = sourceText.toLowerCase();
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
    
    // Generate enhanced dynamic art style based on themes
    let artStyleContent = '';
    if (themes.isHorror) {
      artStyleContent = `**🎭 Visceral Terror Aesthetic: "Psychological Realism with Nightmare Distortion"**

**🎨 Core Visual Philosophy:**
A sophisticated blend of photorealistic foundations that gradually morph into nightmarish impossibilities. The art direction leverages uncanny valley psychology, creating environments that feel hauntingly familiar yet deeply wrong. Visual elements progressively decay from comfort into psychological horror.

**🌈 Advanced Color Psychology & Emotional Palettes:**
- **Safe Haven Zones**: Warm amber (hsl(45, 80%, 60%)) and soft cream (hsl(60, 30%, 85%)) that desaturate as threat levels increase
- **Corruption Transition Areas**: Sickly bile greens (hsl(80, 40%, 30%)) and jaundiced yellows (hsl(50, 70%, 40%)) indicating psychological contamination
- **Nightmare Core Realms**: Deep crimson (hsl(0, 90%, 15%)) and void black (hsl(0, 0%, 5%)) with shock white (hsl(0, 0%, 95%)) for terror beats
- **Memory Fragment Zones**: Sepia tones (hsl(30, 25%, 50%)) that flicker between nostalgic warmth and grotesque distortion
- **Temporal Anomaly Areas**: Shifting purple-black gradients (hsl(280, 60%, 10%)) that bend reality perception

**💡 Revolutionary Lighting Architecture:**
- **Psychological Fluorescent Systems**: Unstable frequencies that create subliminal anxiety through flicker patterns
- **Organic Shadow Play**: Candlelight that casts shadows suggesting threatening shapes just outside peripheral vision
- **Strobe Terror Sequences**: Calculated flash photography effects revealing horrors in microsecond glimpses
- **Void Light Absorption**: Impossible darkness that seems to consume illumination, defying physics
- **Chromatic Aberration Effects**: Light sources that separate into unsettling color spectrums at stress points

**🎬 Cinematic Composition Techniques:**
- **Dutch Angle Progression**: Camera tilts that increase with psychological instability
- **Depth of Field Manipulation**: Focus shifts that mirror attention disorders and dissociation
- **Asymmetrical Framing**: Compositions that create subconscious unease through visual imbalance`;

    } else if (themes.isSciFi) {
      artStyleContent = `**🚀 Cybernetic Dream Aesthetic: "Neo-Digital Surrealism with Organic Integration"**

**🎨 Revolutionary Visual Philosophy:**
A groundbreaking fusion where cutting-edge digital interfaces merge seamlessly with organic dream logic. Technology becomes alive, data flows like rivers, and code structures evolve into architectural marvels. The aesthetic bridges the gap between human consciousness and artificial intelligence.

**🌈 Spectrum-Based Color Psychology:**
- **Interface Core Zones**: Electric azure (hsl(200, 100%, 50%)), neon emerald (hsl(140, 100%, 40%)), and holographic violet (hsl(280, 80%, 60%))
- **Data Stream Highways**: Flowing cyan rivers (hsl(180, 100%, 50%)) and magenta currents (hsl(300, 100%, 50%)) carrying information packets
- **System Error Territories**: Glitch red warnings (hsl(0, 100%, 50%)) and static white noise (hsl(0, 0%, 90%)) indicating corrupted neural pathways
- **Deep Network Abysses**: Midnight blue depths (hsl(220, 100%, 10%)) with brilliant white nodes (hsl(0, 0%, 100%)) representing consciousness
- **Quantum Uncertainty Fields**: Shifting iridescent gradients that cycle through entire spectrum

**💡 Advanced Illumination Engineering:**
- **Holographic Light Manipulation**: Tangible light beams that respond to touch and gesture interactions
- **Data-Driven Luminescence**: Information packets that generate their own illumination based on content complexity
- **Systemic Pulse Rhythms**: Environmental lighting synchronized with digital heartbeat patterns
- **Quantum State Illumination**: Light existing in superposition, creating ethereal multi-dimensional effects
- **Neural Network Glow**: Pathways that brighten as cognitive connections strengthen

**🎮 Interactive Environmental Design:**
- **Responsive Architecture**: Buildings that reconfigure based on user behavior and emotional state
- **Living Interface Elements**: UI components that breathe, pulse, and evolve organically
- **Augmented Reality Overlays**: Digital information seamlessly integrated into physical dreamscapes`;

    } else {
      artStyleContent = `**✨ Ethereal Consciousness Aesthetic: "Transcendent Lucid Impressionism"**

**🎨 Transcendent Visual Philosophy:**
An evolutionary art style that seamlessly blends photorealistic precision with impressionistic dream distortions. The visual language adapts dynamically to the player's psychological state, creating a living canvas that responds to emotions, memories, and consciousness levels. Reality bends and flows like liquid thought.

**🌈 Consciousness-Driven Color Evolution:**
- **Clarity States**: Ethereal pearl white (hsl(0, 0%, 95%)), liquid silver (hsl(0, 0%, 75%)), and crystalline azure (hsl(200, 50%, 80%))
- **Emotional Metamorphosis**: Adaptive color systems - joy manifests as golden amber (hsl(45, 100%, 65%)), melancholy flows as deep violet (hsl(270, 60%, 40%))
- **Memory Archaeological Zones**: Vintage sepia (hsl(30, 40%, 60%)) and golden hour amber (hsl(40, 80%, 70%)) for nostalgic exploration
- **Abstract Transcendence Realms**: Reality-defying electric teal (hsl(180, 100%, 50%)) and cosmic magenta (hsl(320, 100%, 60%))
- **Temporal Flux Regions**: Color gradients that shift through time periods - Victorian browns to neon futures

**💡 Consciousness-Responsive Illumination:**
- **Volumetric Dream Physics**: Light beams with substance that can be walked through and manipulated
- **Emotional Spectrum Dynamics**: Illumination that shifts wavelength based on psychological resonance
- **Temporal Light Archaeology**: Multiple lighting eras coexisting in impossible harmony
- **Realization Burst Events**: Moments of understanding trigger brilliant light explosions revealing hidden truths
- **Meditative Glow Fields**: Peaceful areas emanate soft, healing light that calms and restores

**🎭 Dynamic Atmospheric Systems:**
- **Weather-Emotion Correlation**: Environmental conditions that mirror internal states
- **Particle Consciousness**: Individual motes of light that represent thoughts and memories
- **Gravity-Defying Elements**: Objects that float and flow based on emotional weight rather than physics`;
    }
    
    // Mock concept generation with dynamic content
    const mockConcept: GameConcept = {
      plotline: inputMode === 'template' && gddTemplate.mainStoryline ? 
        `**${gddTemplate.gameTitle || 'Your Dream Game'}: ${gddTemplate.oneLinerPitch || 'An Epic Adventure'}**

${gddTemplate.mainStoryline}

**Main Characters:**
${gddTemplate.mainCharacters || 'Compelling characters to be developed...'}

**Supporting Cast:**
${gddTemplate.supportingCharacters || 'Rich supporting characters that enhance the narrative...'}

**Antagonist:**
${gddTemplate.antagonist || 'A formidable challenge that drives the conflict...'}

**Game World Lore:**
${gddTemplate.loreBackstory || 'A rich history that gives depth to your game world...'}

**Inspiration Sources:**
${gddTemplate.inspiration || 'Drawing from various creative influences...'}` :
        `**The Dreamer's Paradox: A Journey Through Consciousness**

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
      
      worldMap: inputMode === 'template' && gddTemplate.setting ? 
        `**World Design: ${gddTemplate.gameTitle || 'Your Game World'}**

**Setting & Environment:**
${gddTemplate.setting}

**World Structure:**
${gddTemplate.worldStructure ? `This game features a ${gddTemplate.worldStructure} structure, ` : ''}${gddTemplate.loreBackstory ? `built upon the rich lore: ${gddTemplate.loreBackstory}` : 'with carefully designed progression and exploration.'}

**Factions & Cultures:**
${gddTemplate.factionsCultures || 'Diverse groups that add depth and conflict to the world...'}

**Exploration & Movement:**
${gddTemplate.explorationMovement || 'Intuitive movement and exploration systems that enhance player engagement...'}` :
        worldMapContent,
      
      artStyle: inputMode === 'template' && gddTemplate.artStyle ? 
        `**Visual Design Direction: ${gddTemplate.artStyle} Aesthetic**

**Core Art Style:**
${gddTemplate.artStyle} with ${gddTemplate.colorPalette} color palette, creating a distinctive visual identity.

**Character & Environment Design:**
${gddTemplate.characterEnvironmentDesign || 'Carefully crafted character and environment designs that support the game\'s narrative and gameplay...'}

**UI/UX Concepts:**
${gddTemplate.uiuxConcepts || 'Intuitive interface design that complements the art style and enhances player experience...'}

**Audio Integration:**
Music: ${gddTemplate.musicGenre || 'Atmospheric soundtrack'}
Sound Design: ${gddTemplate.soundDesign || 'Immersive audio that enhances gameplay'}
Voice Acting: ${gddTemplate.voiceActing || 'Professional voice work to bring characters to life'}` :
        artStyleContent,

      gameLoop: inputMode === 'template' && gddTemplate.coreGameplayLoop ? 
        `**Core Gameplay Loop:**
${gddTemplate.coreGameplayLoop}

**Combat Mechanics:**
${gddTemplate.combatMechanics || 'Engaging combat systems that complement the core gameplay...'}

**Inventory & Progression:**
${gddTemplate.inventoryProgression || 'Satisfying progression systems that reward player investment...'}

**Player Progression:**
${gddTemplate.playerProgression || 'Meaningful advancement that enhances capabilities and unlocks new content...'}

**Achievements & Replay Value:**
${gddTemplate.achievementsTrophies || 'Compelling achievements that encourage exploration...'}
${gddTemplate.replayValue || 'Features that make players want to experience the game multiple times...'}

**Multiplayer Integration:**
${gddTemplate.multiplayerMode || 'Single-player experience with potential for community features...'}` :
        `**Core Game Loop:**

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

      uiSketches: inputMode === 'template' ? 
        `**UI/UX Design & Implementation**

**Platform Considerations:**
Target Platforms: ${gddTemplate.targetPlatforms || 'Multi-platform design approach'}

**Monetization Integration:**
${gddTemplate.monetizationModel || 'Ethical monetization that enhances rather than detracts from player experience'}

**Accessibility Features:**
${gddTemplate.accessibilityConsiderations || 'Comprehensive accessibility options to ensure all players can enjoy the game'}

**Target Audience Focus:**
${gddTemplate.targetAudience || 'Designed for a broad audience with scalable complexity'}

**Innovation Showcase:**
${gddTemplate.innovationElement || 'Unique features that differentiate this game from others in the genre'}

**Online/Offline Capabilities:**
${gddTemplate.onlineOfflineCapabilities || 'Flexible connectivity options that work for all players'}

**UI Concepts:**
${gddTemplate.uiuxConcepts || 'Clean, intuitive interface design that complements the overall aesthetic'}` :
        `**Advanced UI/UX Design Architecture**

**🎨 Main Menu Interface Design:**
- **Ethereal Title Screen**: Floating logo with particle system animation using CSS transforms and opacity transitions
- **Interactive Background**: Parallax scrolling cosmic elements that respond to mouse movement
- **Adaptive Navigation**: Buttons that morph based on player progress (New Dream → Continue Journey → Master Dreamer)
- **Ambient Audio Triggers**: UI sounds that change pitch based on hover duration and previous user actions

**🎮 Dynamic Gameplay HUD System:**
- **Contextual Time Wheel**: Bottom-right radial interface that expands on hover, showing temporal energy levels
- **Consciousness Meter**: Top-left arc display showing Luna's mental state through color-shifting gradients
- **Memory Fragment Inventory**: Right-side sliding panel with 3D card-flip animations for artifact inspection
- **Adaptive Opacity**: All HUD elements auto-fade during important story moments to maintain cinematic immersion

**⏰ Advanced Time Control Interface:**
- **Multi-Layer Timeline**: Primary timeline shows current loop, secondary shows parallel possibilities
- **Gesture-Based Controls**: Swipe left (rewind), hold space (pause), right-click drag (fast-forward with precision control)
- **Visual Consequence Preview**: Ghostly overlays show immediate effects of temporal changes before commitment
- **Quantum State Indicators**: Particle effects around objects that will be affected by time manipulation

**💬 Immersive Dialogue & Narrative System:**
- **Emotion-Reactive Portraits**: Character faces use shader effects to reflect psychological states
- **Memory-Triggered Responses**: Previous conversations unlock new dialogue branches with visual connection lines
- **Temporal Dialogue Rewind**: Special mechanic allowing players to "undo" conversation choices and see alternate responses
- **Environmental Context Integration**: Background objects subtly highlight during relevant dialogue topics

**📚 Comprehensive Menu & Progress Systems:**
- **Living Dream Journal**: Pages that write themselves as player discovers plot elements, with ink-bleeding effects
- **Constellation Skill Tree**: Star map where completed challenges create new pathways between abilities
- **Artifact Museum**: 3D space where collected memories can be examined from multiple angles with detailed lore
- **Timeline Visualization**: Interactive map showing all parallel timelines the player has created or discovered

**🎯 Accessibility & Customization Features:**
- **Colorblind-Friendly Options**: Alternative visual indicators for all color-coded elements
- **Motor Accessibility**: Single-hand control schemes and adjustable timing windows for time-sensitive actions
- **Cognitive Load Management**: Optional UI complexity levels from "Essential Only" to "Full Details"
- **Personal Preference Memory**: System learns player habits and pre-configures optimal settings`
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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Create Your Dream Game
                </CardTitle>
                <CardDescription>
                  Choose your preferred input method: free-form description or structured template
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 bg-muted/20 p-1 rounded-lg">
                <Button
                  size="sm"
                  variant={inputMode === 'freeform' ? 'default' : 'ghost'}
                  onClick={() => setInputMode('freeform')}
                  className="h-8 px-3"
                >
                  <BookOpen className="h-3 w-3 mr-1" />
                  Free Form
                </Button>
                <Button
                  size="sm"
                  variant={inputMode === 'template' ? 'default' : 'ghost'}
                  onClick={() => setInputMode('template')}
                  className="h-8 px-3"
                >
                  <Brain className="h-3 w-3 mr-1" />
                  GDD Template
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {inputMode === 'freeform' ? (
              <>
                {/* Game Inspiration Gallery */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Dynamic Inspiration Gallery
                    </h4>
                    <div className="flex items-center gap-2">
                      {generatingImages && (
                        <div className="flex items-center gap-1 text-xs text-primary">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span>Generating...</span>
                        </div>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={generateInspirationImages}
                        disabled={!gameIdea.trim() || generatingImages}
                        className="text-xs h-6 px-2"
                      >
                        <Sparkles className="h-3 w-3" />
                        Refresh
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {(inspirationImages.length > 0 ? inspirationImages : [dreamConcept1, dreamConcept2, dreamConcept3]).map((image, index) => (
                      <div key={index} className="relative group cursor-pointer">
                        <img 
                          src={image} 
                          alt={`Game concept inspiration ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg border border-primary/20 group-hover:border-primary/40 transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow-primary"
                          onClick={() => {
                            const inspirationTexts = [
                              'A surreal dream adventure where players navigate floating islands in cosmic voids, manipulating reality through lucid dreaming powers...',
                              'A psychological thriller about lucid dreaming with time manipulation mechanics, where memories fragment and reality shifts with each dream layer...',
                              'A horror-adventure through nightmare realms where players confront psychological fears while navigating twisted dream architecture and temporal anomalies...'
                            ];
                            setGameIdea(gameIdea + (gameIdea ? '\n\n' : '') + inspirationTexts[index]);
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-cosmic/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg flex items-center justify-center backdrop-blur-sm">
                          <div className="text-center">
                            <span className="text-xs text-white font-medium block">
                              {index === 0 ? '🌌 Dream World' : index === 1 ? '✨ Lucid Dream' : '👁️ Nightmare'}
                            </span>
                            <span className="text-xs text-white/70 mt-1 block">Click to inspire</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Images generate based on your dream themes - try different keywords!
                  </p>
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
              </>
            ) : (
              <div className="space-y-6">
                <div className="text-center p-4 bg-muted/20 rounded-lg">
                  <Brain className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold mb-2">Comprehensive Game Design Template</h3>
                  <p className="text-sm text-muted-foreground">
                    Fill out as many sections as you'd like. Each section helps create a more detailed design document.
                  </p>
                </div>

                <Tabs defaultValue="concept" className="w-full">
                  <TabsList className="grid w-full grid-cols-8 text-xs">
                    <TabsTrigger value="concept">🧠 Concept</TabsTrigger>
                    <TabsTrigger value="world">🌍 World</TabsTrigger>
                    <TabsTrigger value="story">🎭 Story</TabsTrigger>
                    <TabsTrigger value="gameplay">🕹️ Gameplay</TabsTrigger>
                    <TabsTrigger value="audio">🎵 Audio</TabsTrigger>
                    <TabsTrigger value="progression">🏆 Progress</TabsTrigger>
                    <TabsTrigger value="innovation">💡 Innovation</TabsTrigger>
                    <TabsTrigger value="technical">🎨 Technical</TabsTrigger>
                  </TabsList>

                  <TabsContent value="concept" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="gameTitle">Game Title</Label>
                        <Input
                          id="gameTitle"
                          placeholder="Enter your game title..."
                          value={gddTemplate.gameTitle}
                          onChange={(e) => setGDDTemplate(prev => ({ ...prev, gameTitle: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gameGenre">Game Genre</Label>
                        <Select value={gddTemplate.gameGenre} onValueChange={(value) => setGDDTemplate(prev => ({ ...prev, gameGenre: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select genre..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rpg">RPG</SelectItem>
                            <SelectItem value="puzzle">Puzzle</SelectItem>
                            <SelectItem value="platformer">Platformer</SelectItem>
                            <SelectItem value="fps">FPS</SelectItem>
                            <SelectItem value="narrative">Narrative-driven</SelectItem>
                            <SelectItem value="strategy">Strategy</SelectItem>
                            <SelectItem value="simulation">Simulation</SelectItem>
                            <SelectItem value="horror">Horror</SelectItem>
                            <SelectItem value="adventure">Adventure</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="inspiration">Inspiration</Label>
                      <Textarea
                        id="inspiration"
                        placeholder="Other games, books, movies, etc. that inspired this idea..."
                        value={gddTemplate.inspiration}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, inspiration: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="oneLinerPitch">One-Line Pitch</Label>
                      <Input
                        id="oneLinerPitch"
                        placeholder="Elevator pitch that hooks players..."
                        value={gddTemplate.oneLinerPitch}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, oneLinerPitch: e.target.value }))}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="world" className="space-y-4">
                    <div>
                      <Label htmlFor="setting">Setting</Label>
                      <Textarea
                        id="setting"
                        placeholder="Describe the world—fantasy realm, post-apocalyptic wasteland, futuristic city, etc..."
                        value={gddTemplate.setting}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, setting: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="worldStructure">World Structure</Label>
                      <Select value={gddTemplate.worldStructure} onValueChange={(value) => setGDDTemplate(prev => ({ ...prev, worldStructure: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select world structure..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open-world">Open World</SelectItem>
                          <SelectItem value="level-based">Level-based</SelectItem>
                          <SelectItem value="sandbox">Sandbox</SelectItem>
                          <SelectItem value="linear">Linear</SelectItem>
                          <SelectItem value="hub-world">Hub World</SelectItem>
                          <SelectItem value="procedural">Procedural</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="loreBackstory">Lore/Backstory</Label>
                      <Textarea
                        id="loreBackstory"
                        placeholder="Describe the history, conflict, or mythos of your world..."
                        value={gddTemplate.loreBackstory}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, loreBackstory: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="factionsCultures">Factions/Cultures</Label>
                      <Textarea
                        id="factionsCultures"
                        placeholder="If any, describe the different groups or cultures..."
                        value={gddTemplate.factionsCultures}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, factionsCultures: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="story" className="space-y-4">
                    <div>
                      <Label htmlFor="mainStoryline">Main Storyline</Label>
                      <Textarea
                        id="mainStoryline"
                        placeholder="High-level summary of the main plot..."
                        value={gddTemplate.mainStoryline}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, mainStoryline: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mainCharacters">Main Character(s)</Label>
                      <Textarea
                        id="mainCharacters"
                        placeholder="Name, role, motivations, backstory..."
                        value={gddTemplate.mainCharacters}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, mainCharacters: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="supportingCharacters">Supporting Characters</Label>
                      <Textarea
                        id="supportingCharacters"
                        placeholder="Allies, rivals, NPCs..."
                        value={gddTemplate.supportingCharacters}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, supportingCharacters: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="antagonist">Antagonist/Villain</Label>
                      <Textarea
                        id="antagonist"
                        placeholder="If applicable, describe the main antagonist..."
                        value={gddTemplate.antagonist}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, antagonist: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="gameplay" className="space-y-4">
                    <div>
                      <Label htmlFor="coreGameplayLoop">Core Gameplay Loop</Label>
                      <Textarea
                        id="coreGameplayLoop"
                        placeholder="What does the player do over and over?"
                        value={gddTemplate.coreGameplayLoop}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, coreGameplayLoop: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="combatMechanics">Combat Mechanics</Label>
                      <Textarea
                        id="combatMechanics"
                        placeholder="If any—turn-based, real-time, stealth?"
                        value={gddTemplate.combatMechanics}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, combatMechanics: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="explorationMovement">Exploration & Movement</Label>
                      <Textarea
                        id="explorationMovement"
                        placeholder="How does the player traverse the world?"
                        value={gddTemplate.explorationMovement}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, explorationMovement: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="inventoryProgression">Inventory & Progression</Label>
                      <Textarea
                        id="inventoryProgression"
                        placeholder="Leveling, skill trees, gear, crafting?"
                        value={gddTemplate.inventoryProgression}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, inventoryProgression: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="multiplayerMode">Multiplayer or Single-player</Label>
                      <Select value={gddTemplate.multiplayerMode} onValueChange={(value) => setGDDTemplate(prev => ({ ...prev, multiplayerMode: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select multiplayer mode..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single-player">Single-player</SelectItem>
                          <SelectItem value="local-multiplayer">Local Multiplayer</SelectItem>
                          <SelectItem value="online-multiplayer">Online Multiplayer</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                          <SelectItem value="mmo">MMO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="uniqueFeatures">Unique Gameplay Features</Label>
                      <Textarea
                        id="uniqueFeatures"
                        placeholder="Something that sets this game apart..."
                        value={gddTemplate.uniqueFeatures}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, uniqueFeatures: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="audio" className="space-y-4">
                    <div>
                      <Label htmlFor="musicGenre">Music Genre</Label>
                      <Textarea
                        id="musicGenre"
                        placeholder="Ambient, orchestral, synthwave, lo-fi, etc..."
                        value={gddTemplate.musicGenre}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, musicGenre: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="soundDesign">Sound Design</Label>
                      <Textarea
                        id="soundDesign"
                        placeholder="Describe how you want weapons, environments, or voices to sound..."
                        value={gddTemplate.soundDesign}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, soundDesign: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="voiceActing">Voice Acting</Label>
                      <Select value={gddTemplate.voiceActing} onValueChange={(value) => setGDDTemplate(prev => ({ ...prev, voiceActing: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Will it have voiceovers?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Voice Acting</SelectItem>
                          <SelectItem value="partial">Partial Voice Acting</SelectItem>
                          <SelectItem value="full">Full Voice Acting</SelectItem>
                          <SelectItem value="cutscenes-only">Cutscenes Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="progression" className="space-y-4">
                    <div>
                      <Label htmlFor="playerProgression">Player Progression</Label>
                      <Textarea
                        id="playerProgression"
                        placeholder="How does the player get stronger?"
                        value={gddTemplate.playerProgression}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, playerProgression: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="achievementsTrophies">Achievements/Trophies</Label>
                      <Textarea
                        id="achievementsTrophies"
                        placeholder="Unique accomplishments or hidden secrets..."
                        value={gddTemplate.achievementsTrophies}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, achievementsTrophies: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="replayValue">Replay Value</Label>
                      <Textarea
                        id="replayValue"
                        placeholder="Is there NG+, branching paths, different endings?"
                        value={gddTemplate.replayValue}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, replayValue: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="innovation" className="space-y-4">
                    <div>
                      <Label htmlFor="innovationElement">What Makes It Unique?</Label>
                      <Textarea
                        id="innovationElement"
                        placeholder="Describe the 'wow factor' that makes this game stand out. Could be a never-before-seen mechanic, story twist, AI-driven world, real-world data integration, genre fusion, etc..."
                        value={gddTemplate.innovationElement}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, innovationElement: e.target.value }))}
                        className="min-h-32"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="technical" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="artStyleTemplate">Art Style</Label>
                        <Select value={gddTemplate.artStyle} onValueChange={(value) => setGDDTemplate(prev => ({ ...prev, artStyle: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select art style..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pixel-art">Pixel Art</SelectItem>
                            <SelectItem value="cel-shaded">Cel-shaded</SelectItem>
                            <SelectItem value="realistic-3d">Realistic 3D</SelectItem>
                            <SelectItem value="anime-inspired">Anime-inspired</SelectItem>
                            <SelectItem value="low-poly">Low Poly</SelectItem>
                            <SelectItem value="hand-drawn">Hand-drawn</SelectItem>
                            <SelectItem value="voxel">Voxel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="colorPalette">Color Palette</Label>
                        <Select value={gddTemplate.colorPalette} onValueChange={(value) => setGDDTemplate(prev => ({ ...prev, colorPalette: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select color palette..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vibrant">Vibrant</SelectItem>
                            <SelectItem value="dark-moody">Dark and Moody</SelectItem>
                            <SelectItem value="pastel">Pastel</SelectItem>
                            <SelectItem value="neon">Neon</SelectItem>
                            <SelectItem value="monochrome">Monochrome</SelectItem>
                            <SelectItem value="earth-tones">Earth Tones</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="uiuxConcepts">UI/UX Concepts</Label>
                      <Textarea
                        id="uiuxConcepts"
                        placeholder="Describe the user interface design, menus, HUD elements..."
                        value={gddTemplate.uiuxConcepts}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, uiuxConcepts: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="characterEnvironmentDesign">Character & Environment Design</Label>
                      <Textarea
                        id="characterEnvironmentDesign"
                        placeholder="Visual design for characters, creatures, and environments..."
                        value={gddTemplate.characterEnvironmentDesign}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, characterEnvironmentDesign: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="targetPlatforms">Target Platforms</Label>
                      <Textarea
                        id="targetPlatforms"
                        placeholder="PC, mobile, console, VR, browser..."
                        value={gddTemplate.targetPlatforms}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, targetPlatforms: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="monetizationModel">Monetization Model</Label>
                      <Select value={gddTemplate.monetizationModel} onValueChange={(value) => setGDDTemplate(prev => ({ ...prev, monetizationModel: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select monetization model..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="free-to-play">Free-to-play</SelectItem>
                          <SelectItem value="freemium">Freemium</SelectItem>
                          <SelectItem value="subscription">Subscription</SelectItem>
                          <SelectItem value="ads">Ads</SelectItem>
                          <SelectItem value="battle-pass">Battle Pass</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="onlineOfflineCapabilities">Online/Offline Capabilities</Label>
                      <Select value={gddTemplate.onlineOfflineCapabilities} onValueChange={(value) => setGDDTemplate(prev => ({ ...prev, onlineOfflineCapabilities: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select online/offline capabilities..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="offline-only">Offline Only</SelectItem>
                          <SelectItem value="online-only">Online Only</SelectItem>
                          <SelectItem value="both">Both Online & Offline</SelectItem>
                          <SelectItem value="offline-with-sync">Offline with Cloud Sync</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="targetAudience">Target Audience</Label>
                      <Textarea
                        id="targetAudience"
                        placeholder="Age group, interest group, casual/hardcore..."
                        value={gddTemplate.targetAudience}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, targetAudience: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="accessibilityConsiderations">Accessibility Considerations</Label>
                      <Textarea
                        id="accessibilityConsiderations"
                        placeholder="Subtitles, colorblind mode, etc..."
                        value={gddTemplate.accessibilityConsiderations}
                        onChange={(e) => setGDDTemplate(prev => ({ ...prev, accessibilityConsiderations: e.target.value }))}
                        className="min-h-20"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            <Button 
              onClick={generateConcept}
              disabled={(inputMode === 'freeform' ? !gameIdea.trim() : !gddTemplate.gameTitle.trim()) || isGenerating}
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
                  Generate Game Design Document
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