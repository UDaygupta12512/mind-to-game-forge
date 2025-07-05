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
import gameConcept1 from '@/assets/game-concept-1.jpg';
import gameConcept2 from '@/assets/game-concept-2.jpg';
import gameConcept3 from '@/assets/game-concept-3.jpg';

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
  const { toast } = useToast();

  const generateConcept = async () => {
    if (!gameIdea.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate generation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock concept generation
    const mockConcept: GameConcept = {
      plotline: `**The Dreamer's Paradox**

You play as Luna, a lucid dreamer trapped in recursive nightmares. Each dream layer contains temporal puzzles that must be solved by manipulating time - rewinding conversations, fast-forwarding through events, or pausing reality to examine clues.

**Act 1: The Shallow Sleep**
Luna discovers her ability to control time in dreams when a recurring nightmare of her childhood home begins changing. She must learn to rewind conversations with shadow figures to uncover repressed memories.

**Act 2: The Deep Dive** 
As Luna descends deeper into her subconscious, the time manipulation becomes more complex. She can now split timelines, creating parallel dream sequences to solve multi-layered puzzles involving her past trauma.

**Act 3: The Nightmare's Core**
In the deepest layer, Luna faces her greatest fear - losing her grip on reality. Time becomes unstable, and she must use all her temporal abilities to escape before the nightmare consumes her waking mind.

The story explores themes of memory, trauma healing, and the power of facing one's fears.`,
      
      worldMap: `**World Map Design: The Dreamer's Paradox**

**Main Hub: Luna's Bedroom**
- Starting point of each dream cycle
- Contains the Dream Mirror (level selection)
- Shows temporal distortions as progress increases

**Level 1: Childhood Home (Shallow Sleep)**
- Familiar rooms with slight distortions
- Kitchen where conversations rewind
- Living room with paused family photos
- Basement door leading deeper

**Level 2: School Memories (Deep Sleep)**
- Classrooms with shifting timelines
- Hallways that loop when time is manipulated
- Library where books show different eras
- Principal's office (boss encounter)

**Level 3: The Temporal Nexus (Nightmare Core)**
- Fractured reality with floating platforms
- Multiple timeline versions of same spaces
- Central void where all fears converge
- Luna's true self at the center

**Connections:**
- Dream Portals: Swirling temporal vortexes between levels
- Memory Bridges: Paths that shift based on solved puzzles
- Time Tears: Shortcuts unlocked by mastering temporal abilities

**Visual Elements:**
- Floating time fragments showing glimpses of memories
- Clock towers that bend and twist through dimensions
- Ethereal mist that flows between connected areas`,
      
      artStyle: `**Ethereal Nightmare Aesthetic**

**Visual Style:** Surreal photorealism with dreamy distortions
- **Color Palette:** Deep purples, midnight blues, silver highlights with occasional warm amber for "safe" dream spaces
- **Lighting:** Dramatic chiaroscuro with supernatural glows emanating from time-distorted objects
- **Textures:** Soft, flowing fabrics that defy gravity; crystalline time fragments; misty ethereal effects

**Character Design:**
- Luna: Flowing hair that moves like liquid, eyes that reflect different time periods
- Shadow Figures: Partially transparent with clock-like internal mechanisms visible
- Environment: Architecture that bends and morphs, with floating temporal artifacts

**Visual Effects:**
- Time rewind: Objects trail with ghostly afterimages
- Time pause: Everything except interactive elements turns monochrome
- Time acceleration: Motion blur with streaking light effects`,

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
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">Game Inspiration Gallery</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="relative group cursor-pointer">
                  <img 
                    src={gameConcept1} 
                    alt="Fantasy game concept" 
                    className="w-full h-20 object-cover rounded-lg border border-primary/20 group-hover:border-primary/40 transition-colors"
                    onClick={() => setGameIdea(gameIdea + (gameIdea ? '\n\n' : '') + 'A mystical fantasy adventure with magical elements and ethereal environments...')}
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <span className="text-xs text-primary font-medium">Fantasy</span>
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <img 
                    src={gameConcept2} 
                    alt="Cyberpunk game concept" 
                    className="w-full h-20 object-cover rounded-lg border border-primary/20 group-hover:border-primary/40 transition-colors"
                    onClick={() => setGameIdea(gameIdea + (gameIdea ? '\n\n' : '') + 'A cyberpunk thriller set in a neon-lit futuristic city with high-tech gadgets and dark atmosphere...')}
                  />
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <span className="text-xs text-accent font-medium">Cyberpunk</span>
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <img 
                    src={gameConcept3} 
                    alt="Space exploration game concept" 
                    className="w-full h-20 object-cover rounded-lg border border-primary/20 group-hover:border-primary/40 transition-colors"
                    onClick={() => setGameIdea(gameIdea + (gameIdea ? '\n\n' : '') + 'A space exploration epic featuring alien worlds, advanced spacecraft, and cosmic adventures...')}
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <span className="text-xs text-primary font-medium">Sci-Fi</span>
                  </div>
                </div>
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