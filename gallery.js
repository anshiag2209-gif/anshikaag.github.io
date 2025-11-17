/* gallery.js
   This file contains:
   - parallax mouse movement
   - artwork dataset
   - render functions for each collection row
   - slide button behavior
   - featured auto-slider & rotation
   - nav auto-highlight on scroll
   - click-to-view (stores to sessionStorage -> artwork.html)
*/

/* PARALLAX (mouse) */
document.addEventListener("mousemove", (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 20;
    const y = (e.clientY - window.innerHeight / 2) / 20;
    const para = document.getElementById("para");
    if (para) para.style.transform = `scale(1.15) translate(${x}px, ${y}px)`;
});

/* ARTWORK DATA (copied from gallery_walkthrough.html) */
const artworks = {
    renaissance: [
        {
                    id: 1,
                    title: "Mona Lisa",
                    artist: "Leonardo da Vinci",
                    year: "1503-1519",
                    medium: "Oil on poplar panel",
                    style: "High Renaissance",
                    location: "Louvre Museum, Paris",
                    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg",
                    description: "The Mona Lisa is perhaps the most famous painting in the world. Leonardo da Vinci's masterpiece depicts a woman with an enigmatic smile against a distant landscape. The painting is renowned for its innovative techniques, including sfumato (subtle gradations of light and shadow) and atmospheric perspective.",
                    curatorNotes: "This iconic portrait revolutionized Renaissance portraiture through Leonardo's mastery of sfumato and psychological depth. The subject's mysterious smile and the artist's meticulous attention to detail have captivated viewers for centuries, making it one of the most studied and admired works in art history."
                },
                {
                    id: 2,
                    title: "The Birth of Venus",
                    artist: "Sandro Botticelli",
                    year: "1484-1486",
                    medium: "Tempera on canvas",
                    style: "Early Renaissance",
                    location: "Uffizi Gallery, Florence",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/960px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
                    description: "This masterpiece depicts the goddess Venus emerging from the sea as a fully grown woman, arriving at the shore on a shell. The painting represents the rebirth of classical antiquity and embodies the Renaissance ideals of beauty, grace, and divine inspiration.",
                    curatorNotes: "Botticelli's Venus stands as one of the most celebrated representations of mythological beauty in Western art. The painting's ethereal quality, flowing lines, and mythological subject matter exemplify the Renaissance fascination with classical themes and humanist philosophy."
                },
                {
                    id: 3,
                    title: "The School of Athens",
                    artist: "Raphael",
                    year: "1509-1511",
                    medium: "Fresco",
                    style: "High Renaissance",
                    location: "Vatican Museums, Rome",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1280px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg",
                    description: "This magnificent fresco represents philosophy and depicts the greatest mathematicians, philosophers and scientists from classical antiquity gathered together sharing their ideas. At the center stand Plato and Aristotle, representing different philosophical traditions.",
                    curatorNotes: "Raphael's masterpiece showcases the Renaissance ideal of uniting classical philosophy with contemporary Christian thought. The architectural setting and perfect use of perspective demonstrate the artist's technical mastery, while the gathering of ancient thinkers celebrates human intellectual achievement."
                },
                {
                    id: 4,
                    title: "The Last Supper",
                    artist: "Leonardo da Vinci",
                    year: "1495-1498",
                    medium: "Tempera on gesso, pitch, and mastic",
                    style: "High Renaissance",
                    location: "Santa Maria delle Grazie, Milan",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg/1920px-The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg",
                    description: "This iconic mural depicts the dramatic moment when Jesus announces that one of his disciples will betray him. Leonardo captures the psychological reactions of each apostle, creating a narrative of human emotion and divine drama.",
                    curatorNotes: "Leonardo's Last Supper represents a pinnacle of Renaissance narrative art. The mathematical precision of the perspective, combined with the emotional complexity of the figures, creates a work of unparalleled dramatic power that continues to influence artists centuries later."
                },
                {
                    id: 5,
                    title: "The Creation of Adam",
                    artist: "Michelangelo",
                    year: "1508-1512",
                    medium: "Fresco",
                    style: "High Renaissance",
                    location: "Sistine Chapel, Vatican",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1920px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg",
                    description: "The most famous section of the Sistine Chapel ceiling shows God giving life to Adam through the near-touching of their fingers. This powerful image has become one of the most iconic images in art history, symbolizing the spark of divine creation.",
                    curatorNotes: "Michelangelo's fresco captures the moment of human creation with unprecedented dynamism and emotional intensity. The nearly touching hands have become a universal symbol of creation, representing the connection between the divine and human realms."
                },
                {
                    id: 6,
                    title: "Assumption of the Virgin",
                    artist: "Titian",
                    year: "1516-1518",
                    medium: "Oil on panel",
                    style: "High Renaissance",
                    location: "Santa Maria Gloriosa dei Frari, Venice",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Tizian_041.jpg/500px-Tizian_041.jpg",
                    description: "This monumental altarpiece depicts the Virgin Mary ascending to heaven, surrounded by apostles below and greeted by God above. The dramatic composition and vivid colors revolutionized Venetian painting.",
                    curatorNotes: "Titian's Assumption demonstrates the Venetian Renaissance mastery of color and emotional expression. The painting's dynamic composition and brilliant use of red create a powerful sense of upward movement and divine glory."
                },
                {
                    id: 7,
                    title: "Primavera",
                    artist: "Sandro Botticelli",
                    year: "1477-1482",
                    medium: "Tempera on panel",
                    style: "Early Renaissance",
                    location: "Uffizi Gallery, Florence",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Botticelli-primavera.jpg/960px-Botticelli-primavera.jpg",
                    description: "This allegorical painting celebrates spring and love through classical mythology. Venus stands at the center while various mythological figures represent different aspects of love and renewal in an enchanted garden setting.",
                    curatorNotes: "Botticelli's Primavera is one of the most discussed paintings in art history, rich with symbolism and Neoplatonic philosophy. The painting's complex iconography and lyrical beauty exemplify the Renaissance fusion of classical and Christian themes."
                },
                {
                    id: 8,
                    title: "The Resurrection",
                    artist: "Piero della Francesca",
                    year: "1463-1465",
                    medium: "Fresco",
                    style: "Early Renaissance",
                    location: "Museo Civico, Sansepolcro",
                    image: "http://www.travelingintuscany.com/images/art/pierodellafrancesca/resurrection700.jpg",
                    description: "Christ rises triumphantly from his tomb while the guards sleep below. Piero's mathematical precision and powerful composition create an image of divine authority and spiritual transformation.",
                    curatorNotes: "Piero della Francesca's Resurrection combines geometric perfection with profound spiritual meaning. The frontal, symmetrical composition and Christ's penetrating gaze create an image of timeless power that transcends its historical moment."
                }
    ],
    abstract: [
        {
                    id: 9,
                    title: "Composition VIII",
                    artist: "Wassily Kandinsky",
                    year: "1923",
                    medium: "Oil on canvas",
                    style: "Abstract Art",
                    location: "Guggenheim Museum, New York",
                    image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Wassily_Kandinsky_Composition_VIII.jpg",
                    description: "Kandinsky's Composition VIII is a symphony of geometric forms and vibrant colors. The painting features circles, triangles, and lines arranged in a dynamic balance that suggests both cosmic order and musical harmony. Kandinsky believed abstract forms could express spiritual truths beyond representation.",
                    curatorNotes: "This masterwork represents Kandinsky's mature style, where he perfected his theory of spiritual abstraction. The painting's geometric vocabulary and color relationships create a visual music that speaks directly to the viewer's emotions, bypassing the need for recognizable subject matter."
                },
                {
                    id: 10,
                    title: "Broadway Boogie Woogie",
                    artist: "Piet Mondrian",
                    year: "1942-1943",
                    medium: "Oil on canvas",
                    style: "De Stijl / Neo-Plasticism",
                    location: "MoMA, New York",
                    image: "https://upload.wikimedia.org/wikipedia/commons/3/30/Piet_Mondrian%2C_1942_-_Broadway_Boogie_Woogie.jpg",
                    description: "Inspired by the energy of New York City and jazz music, this painting abandons Mondrian's characteristic black grid for vibrant blocks of yellow, red, and blue. The syncopated rhythm of colors evokes the bustling streets and dynamic music of Manhattan.",
                    curatorNotes: "Broadway Boogie Woogie marks the culmination of Mondrian's artistic journey from naturalism to pure abstraction. The painting captures the vitality of American culture while maintaining the artist's commitment to universal harmony through geometric abstraction."
                },
                {
                    id: 11,
                    title: "Number 1A",
                    artist: "Jackson Pollock",
                    year: "1948",
                    medium: "Oil and enamel on canvas",
                    style: "Abstract Expressionism",
                    location: "MoMA, New York",
                    image: "https://terraingallery.org/wp-content/uploads/2015/08/pollock-number-1A-1948-850px.jpg",
                    description: "Pollock's revolutionary drip painting technique created complex webs of paint that seem to capture pure energy and movement. By placing the canvas on the floor and dripping paint from above, Pollock created a new relationship between artist and artwork.",
                    curatorNotes: "This groundbreaking work exemplifies Pollock's action painting technique, where the process of creation becomes as important as the finished work. The intricate layers and rhythmic patterns create a sense of controlled chaos that revolutionized modern art."
                },
                {
                    id: 12,
                    title: "Jack-in-the-Pulpit",
                    artist: "Georgia O'Keeffe",
                    year: "1930",
                    medium: "Oil on canvas",
                    style: "American Modernism",
                    location: "National Gallery of Art, Washington",
                    image: "https://www.georgiaokeeffe.net/assets/img/paintings/jack-in-the-pulpit.jpg",
                    description: "O'Keeffe's close-up view of a jack-in-the-pulpit flower transforms the natural form into an abstract composition of curves and colors. The painting explores the boundary between representation and abstraction through intimate observation.",
                    curatorNotes: "O'Keeffe's floral abstractions challenge viewers to see familiar forms in new ways. Her magnified perspective and bold color choices transform a simple flower into a powerful exploration of organic form and sensual beauty."
                },
                {
                    id: 13,
                    title: "The Swan",
                    artist: "Hilma af Klint",
                    year: "1914-1915",
                    medium: "Oil on canvas",
                    style: "Abstract Art / Spiritual Art",
                    location: "Hilma af Klint Foundation",
                    image: "https://www.artgallery.nsw.gov.au/media/thumbnails/uploads/artboards/2021_07/The-swan-1.jpg.1400x1400_q85.jpg",
                    description: "Created years before Kandinsky's famous abstractions, af Klint's spiritual paintings use symbolic forms and colors to represent invisible forces and higher dimensions. The swan symbolizes transformation and spiritual ascension.",
                    curatorNotes: "Hilma af Klint pioneered abstract art while remaining virtually unknown during her lifetime. Her visionary works, inspired by spiritualism and theosophy, created a unique visual language for expressing metaphysical concepts decades ahead of her time."
                },
                {
                    id: 14,
                    title: "Evocation Hivernale A",
                    artist: "Chu Teh-Chun",
                    year: "1993",
                    medium: "Oil on canvas",
                    style: "Abstract Expressionism / Lyrical Abstraction",
                    location: "Private Collection",
                    image: "https://ik.imagekit.io/theartling/prod/original_images/chu_teh_chun.jpg?tr=w-1800",
                    description: "This powerful abstract work combines Eastern calligraphic traditions with Western abstract expressionism. The sweeping gestures and subtle color harmonies evoke winter landscapes while maintaining pure abstraction.",
                    curatorNotes: "Chu Teh-Chun masterfully bridges Eastern and Western artistic traditions. His dynamic brushwork and sophisticated color relationships create works of profound emotional resonance that transcend cultural boundaries."
                },
                {
                    id: 15,
                    title: "Small Flies and Other Wings",
                    artist: "Christine Ay Tjoe",
                    year: "2011",
                    medium: "Acrylic on canvas",
                    style: "Contemporary Abstract",
                    location: "Various Collections",
                    image: "https://ik.imagekit.io/theartling/prod/original_images/christine_Tcvs64y.png?tr=w-1800",
                    description: "Tjoe's intense, layered abstractions explore themes of violence, beauty, and transformation. The tangled lines and vibrant colors create a sense of both chaos and careful construction, reflecting complex psychological states.",
                    curatorNotes: "Christine Ay Tjoe's powerful abstractions challenge viewers with their raw intensity and emotional depth. Her distinctive use of line and color creates works that are simultaneously beautiful and unsettling, exploring the darker aspects of human experience."
                },
                {
                    id: 16,
                    title: "Senecio",
                    artist: "Paul Klee",
                    year: "1922",
                    medium: "Oil on gauze mounted on cardboard",
                    style: "Expressionism / Abstract Art",
                    location: "Kunstmuseum Basel",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Senecio2.JPG/500px-Senecio2.JPG",
                    description: "Also known as 'Head of a Man Going Senile,' this painting uses simple geometric shapes and warm colors to create a face that is both childlike and profound. The work exemplifies Klee's unique blend of abstraction and symbolism.",
                    curatorNotes: "Klee's Senecio demonstrates his extraordinary ability to convey complex emotions through simplified forms. The painting's geometric precision and subtle color variations create a portrait that transcends individual identity to become an archetype of human experience."
                }
    ],
    modern: [
        {
                    id: 17,
                    title: "Les Demoiselles d'Avignon",
                    artist: "Pablo Picasso",
                    year: "1907",
                    medium: "Oil on canvas",
                    style: "Proto-Cubism",
                    location: "MoMA, New York",
                    image: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdfhhTvuOJec69lkvDiVSnnh1iyu8Yo7h8NckV1DWDhFmrjMO5IUCh6KB61JbDltNXMu1uORO3weEW2XWhwD8c8lOS8lNIhQeL17pMJ77XyOK-nup-_bzSm9QMEowmU3xvMv1V4Gw?key=rsin6iOewnZx508oJll35A",
                    description: "This revolutionary painting shattered conventions of perspective and representation. Five nude figures are depicted with angular, mask-like faces influenced by African art, marking the beginning of Cubism and modern art's break with tradition.",
                    curatorNotes: "Les Demoiselles d'Avignon represents one of the most radical breaks in art history. Picasso's fragmentation of form and space launched Cubism and fundamentally changed how artists understood representation, making this one of the most influential paintings of the 20th century."
                },
                {
                    id: 18,
                    title: "Nude Descending a Staircase, No. 2",
                    artist: "Marcel Duchamp",
                    year: "1912",
                    medium: "Oil on canvas",
                    style: "Cubism / Futurism",
                    location: "Philadelphia Museum of Art",
                    image: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdH6haj6VISy3KqEsiXqj4cBbEAoaqLZKm5g-wLVUj7xQN2te_dXU46ajvgw8EeZvuixnjtSlv6jUwDAN5bUXIuz1IfNUEgJNIss46XjCsVJyL5Zy3qyGTq-jhCwreganoq34sX9A?key=rsin6iOewnZx508oJll35A",
                    description: "This iconic work combines Cubist fragmentation with Futurist motion studies to depict a figure descending stairs. The overlapping planes suggest movement through time and space, creating a visual representation of the fourth dimension.",
                    curatorNotes: "Duchamp's masterpiece caused scandal when first exhibited, yet it became one of modern art's most celebrated works. The painting's innovative approach to depicting motion influenced both art and popular culture, from cinema to comic books."
                },
                {
                    id: 19,
                    title: "The Harlequin's Carnival",
                    artist: "Joan Miró",
                    year: "1924-1925",
                    medium: "Oil on canvas",
                    style: "Surrealism",
                    location: "Albright-Knox Art Gallery, Buffalo",
                    image: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfOVOG7dmlb03SZ5B_6yeydicNMIww6cnPBKtbkVRFj75GJY3EqxtoL7PUlwVoUH5YPdJ5O_RJtChdxxx_9kZFImqsNoNEo6qz4pBFp_ffYycgzZjdyi_-b6GJISelbXrCtIFF_Gg?key=rsin6iOewnZx508oJll35A",
                    description: "This whimsical painting depicts a fantastical carnival scene filled with biomorphic creatures, musical instruments, and playful symbols. Miró created this while experiencing hunger-induced hallucinations, resulting in a dreamlike celebration of imagination.",
                    curatorNotes: "The Harlequin's Carnival showcases Miró's unique surrealist vocabulary of organic shapes and bright colors. The painting's childlike spontaneity masks sophisticated composition and symbolism, creating a joyful yet mysterious visual poetry."
                },
                {
                    id: 20,
                    title: "Abaporu",
                    artist: "Tarsila do Amaral",
                    year: "1928",
                    medium: "Oil on canvas",
                    style: "Brazilian Modernism",
                    location: "MALBA, Buenos Aires",
                    image: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcNiNAjNjbhdIGJoxOtcj8Cw1bUI4ofcF2fDvPUuPGQ-T_9n3mDYUbw0B2mDu1VhRsBBfAspqbTWaNPGPk7cbMIfrMyApGTYqXruJKQk5sqFdF1eV55jpSHTLi3R9XJk8K2wegx6A?key=rsin6iOewnZx508oJll35A",
                    description: "This iconic Brazilian modernist work depicts a solitary figure with exaggerated limbs sitting beneath a tropical sun and cactus. The title means 'man who eats' in Tupi-Guarani, symbolizing Brazil's cultural identity and connection to indigenous roots.",
                    curatorNotes: "Abaporu became the symbol of Brazilian Modernism and the Antropofagia movement, which advocated 'cannibalizing' European culture to create something uniquely Brazilian. The painting's bold distortions and vibrant palette celebrate Brazil's cultural independence."
                },
                {
                    id: 21,
                    title: "The Persistence of Memory",
                    artist: "Salvador Dalí",
                    year: "1931",
                    medium: "Oil on canvas",
                    style: "Surrealism",
                    location: "MoMA, New York",
                    image: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdsrwHxhu4ddxopWNzB9LyN88crNEw9nWekKRaKdopqf42VtnLsClK_YUVYlhtNrE7ICIueOjtxg2tlYidJliRNMoxhW3Wonh-Im54cDj-bBnBQdgLmXmzM6ETvEbjrCsw7ZUddoA?key=rsin6iOewnZx508oJll35A",
                    description: "Dalí's most famous work features melting pocket watches in a dreamlike landscape. The painting explores concepts of time, memory, and mortality through its uncanny imagery, combining precise technique with irrational subject matter.",
                    curatorNotes: "The Persistence of Memory has become an icon of Surrealism and 20th-century art. Dalí's 'soft watches' create a haunting meditation on the fluidity of time and the unreliability of memory, executed with technical precision that makes the impossible seem real."
                },
                {
                    id: 22,
                    title: "The Two Fridas",
                    artist: "Frida Kahlo",
                    year: "1939",
                    medium: "Oil on canvas",
                    style: "Surrealism / Symbolism",
                    location: "Museum of Modern Art, Mexico City",
                    image: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXfHhGfsCcaN7EYpN_zGOxpQF7XTpJPG33xAsmeExIXyJBu8yg6YFtOl8IMWOSVXcPHAQ5JW2EmXjZXcwa8lr_WJz8zY-DFK5KRHtcSZTPAOX71v9RcZP1UkYF7gJYBsTRz6FWxF0Q?key=rsin6iOewnZx508oJll35A",
                    description: "This double self-portrait shows two versions of Kahlo sitting side by side, their hearts connected by a single artery. One wears traditional Mexican dress, the other European clothing, representing her dual heritage and inner conflict following her divorce from Diego Rivera.",
                    curatorNotes: "The Two Fridas is one of Kahlo's most powerful explorations of identity and emotional pain. The exposed hearts and flowing blood create a visceral symbol of heartbreak and resilience, while the two figures represent the artist's complex sense of self."
                },
                {
                    id: 23,
                    title: "Inventions of the Monsters",
                    artist: "Salvador Dalí",
                    year: "1937",
                    medium: "Oil on canvas",
                    style: "Surrealism",
                    location: "Art Institute of Chicago",
                    image: "https://www.artic.edu/iiif/2/be9551d4-860f-37a0-1408-086617f1824e/full/843,/0/default.jpg",
                    description: "Created during the Spanish Civil War, this nightmarish vision features bizarre hybrid creatures and distorted forms. The painting reflects Dalí's anxieties about the impending World War II and the monsters that humanity creates.",
                    curatorNotes: "This haunting work demonstrates how Dalí used surrealism to confront political and personal fears. The grotesque inventions serve as metaphors for the horrors of war, showing surrealism's power to address serious themes through fantastic imagery."
                },
                {
                    id: 24,
                    title: "Portrait of Pablo Picasso",
                    artist: "Juan Gris",
                    year: "1912",
                    medium: "Oil on canvas",
                    style: "Analytical Cubism",
                    location: "Art Institute of Chicago",
                    image: "https://www.artic.edu/iiif/2/4f7ccf9f-a8ce-2bd8-2d15-a38b2e6caa7a/full/843,/0/default.jpg",
                    description: "Gris's Cubist portrait of his friend Picasso fragments the face into geometric planes while maintaining recognizable features. The painting demonstrates how Cubism could preserve identity while completely transforming representation.",
                    curatorNotes: "Juan Gris brought clarity and structure to Cubism that distinguished his work from Picasso and Braque. This portrait honors his mentor while asserting his own artistic vision, showing how Cubism evolved beyond its founders."
                }
    ],
    contemporary: [
        {
                    id: 25,
                    title: "Infinity Mirror Room - Love Forever",
                    artist: "Yayoi Kusama",
                    year: "1966/1994",
                    medium: "Mixed media installation",
                    style: "Contemporary Installation Art",
                    location: "The Broad, Los Angeles",
                    image: "https://www.thebroad.org/sites/default/files/press/kusama_infinity_morrored_room_love_forever_1.jpg",
                    description: "This immersive installation uses mirrors and LED lights to create an infinite space filled with glowing orbs. Visitors experience a sense of boundlessness and cosmic wonder, reflecting Kusama's lifelong exploration of infinity and self-obliteration.",
                    curatorNotes: "Kusama's Infinity Mirror Rooms have become iconic contemporary artworks, offering transformative experiences that challenge our perception of space and self. The work combines minimalist aesthetics with maximalist impact, creating environments of pure wonder."
                },
                {
                    id: 26,
                    title: "Look Mickey",
                    artist: "Roy Lichtenstein",
                    year: "1961",
                    medium: "Oil on canvas",
                    style: "Pop Art",
                    location: "National Gallery of Art, Washington",
                    image: "https://upload.wikimedia.org/wikipedia/en/4/43/Look_Mickey.jpg",
                    description: "This breakthrough painting launched Lichtenstein's Pop Art career by appropriating comic book imagery. Mickey Mouse and Donald Duck are rendered in the artist's signature Ben-Day dots style, elevating commercial art to fine art status.",
                    curatorNotes: "Look Mickey marked a revolutionary moment in art history, challenging distinctions between high and low culture. Lichtenstein's mechanical technique and commercial subject matter provoked controversy while establishing Pop Art as a major movement."
                },
                {
                    id: 27,
                    title: "Ceiling of Paris Opera Garnier",
                    artist: "Marc Chagall",
                    year: "1964",
                    medium: "Oil on canvas panels",
                    style: "Modernism / Fantasy Art",
                    location: "Palais Garnier, Paris",
                    image: "https://www.opera-online.com/media/images/picture/article/0000/0237/740/xl_xl_opera_garnier_-_chagall_ceiling.jpg",
                    description: "Chagall's monumental ceiling painting celebrates 14 composers and their operas through a dreamlike fusion of color and form. The work brings his signature floating figures and mystical imagery to one of the world's most famous opera houses.",
                    curatorNotes: "Despite initial controversy over modernizing a historic building, Chagall's ceiling has become beloved for how it honors musical tradition while asserting contemporary artistic vision. The painting's joyful energy perfectly captures the magic of opera."
                },
                {
                    id: 28,
                    title: "Flower Ball",
                    artist: "Takashi Murakami",
                    year: "2002",
                    medium: "Acrylic on canvas mounted on board",
                    style: "Superflat / Neo-Pop",
                    location: "Various Collections",
                    image: "https://globalartcritique.com/wp-content/uploads/2024/09/Flower-Ball-Takashi-Murakami-2002-.jpg",
                    description: "Murakami's signature smiling flowers cluster together in a kaleidoscopic sphere. The work embodies his 'Superflat' aesthetic, flattening distinctions between high art and commercial culture while celebrating kawaii (cute) aesthetics.",
                    curatorNotes: "Flower Ball exemplifies Murakami's fusion of traditional Japanese art, anime, and contemporary consumer culture. The seemingly cheerful surface masks deeper commentaries on post-war Japanese society and the globalization of pop culture."
                },
                {
                    id: 29,
                    title: "Girl with Balloon",
                    artist: "Banksy",
                    year: "2002",
                    medium: "Stencil / Spray paint",
                    style: "Street Art / Contemporary",
                    location: "Various locations / Collections",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Banksy_Girl_and_Heart_Balloon_%282840632113%29.jpg/1200px-Banksy_Girl_and_Heart_Balloon_%282840632113%29.jpg",
                    description: "This iconic image shows a young girl reaching for a red heart-shaped balloon. The simple, powerful imagery has become Banksy's most recognized work, symbolizing hope, innocence, and loss in equal measure.",
                    curatorNotes: "Girl with Balloon demonstrates street art's power to create universally resonant images. The work's emotional directness and technical simplicity allow it to transcend the gallery and live in public consciousness, redefining what art can be and where it belongs."
                },
                {
                    id: 30,
                    title: "I Still Face You",
                    artist: "Njideka Akunyili Crosby",
                    year: "2015",
                    medium: "Acrylic, transfers, colored pencil, and collage on paper",
                    style: "Contemporary Mixed Media",
                    location: "Whitney Museum, New York",
                    image: "https://www.njidekaakunyilicrosby.com/wp-content/uploads/2015/10/Akunyili-Crosby-I-Still-Face-You-1000x787.jpg",
                    description: "This intimate portrait layers personal photographs and Nigerian pop culture imagery within a domestic scene. The work explores themes of identity, memory, and the immigrant experience through complex visual collage.",
                    curatorNotes: "Akunyili Crosby's layered technique mirrors the complexity of diasporic identity. Her incorporation of Nigerian imagery into Western painting traditions creates a unique visual language that bridges cultures and challenges notions of belonging."
                },
                {
                    id: 31,
                    title: "Maman",
                    artist: "Louise Bourgeois",
                    year: "1999",
                    medium: "Bronze, stainless steel, and marble",
                    style: "Contemporary Sculpture",
                    location: "Various locations worldwide",
                    image: "https://i0.wp.com/blog.artsper.com/wp-content/uploads/2013/09/louise-bourgeois-maman.jpg?resize=644%2C430&ssl=1",
                    description: "This monumental spider sculpture stands over 30 feet tall, with a sac containing marble eggs. The work represents both the strength and fragility of motherhood, combining protective and predatory associations of the spider.",
                    curatorNotes: "Maman is Bourgeois's tribute to her mother, a weaver. The spider becomes a powerful symbol of maternal protection and creativity, while its imposing scale creates a visceral experience of awe and vulnerability that resonates universally."
                },
                {
                    id: 32,
                    title: "Autumn Rhythm (Number 30)",
                    artist: "Jackson Pollock",
                    year: "1950",
                    medium: "Enamel on canvas",
                    style: "Abstract Expressionism",
                    location: "Metropolitan Museum of Art, New York",
                    image: "https://upload.wikimedia.org/wikipedia/en/f/fa/Autumn_Rhythm.jpg",
                    description: "One of Pollock's largest and most elegant drip paintings, created entirely in black, white, and brown. The painting's rhythmic complexity suggests natural forces and organic growth, capturing the essence of autumn through pure abstraction.",
                    curatorNotes: "Autumn Rhythm represents the peak of Pollock's drip technique, where spontaneity and control achieve perfect balance. The monochromatic palette allows viewers to focus on the painting's remarkable spatial complexity and dynamic energy."
                }
    ]
};

/* helper: build card HTML */
function cardHTML(a, category) {
    return `
        <div class="artwork-item" onclick="viewArtwork(${a.id}, '${category}')">
            <div class="artwork-image-wrapper">
                <img class="artwork-image" src="${a.image}" alt="${a.title}">
                <div class="artwork-overlay"></div>
                <div class="quick-view">VIEW DETAILS</div>
            </div>
            <div class="artwork-info">
                <h3 class="artwork-title">${a.title}</h3>
                <p class="artwork-artist">${a.artist}</p>
            </div>
        </div>`;
}

/* render collection rows */
function renderArtSliders() {
    const r = document.getElementById("renaissanceSlider");
    const a = document.getElementById("abstractSlider");
    const m = document.getElementById("modernSlider");
    const c = document.getElementById("contemporarySlider");

    if (r) r.innerHTML = artworks.renaissance.map(x => cardHTML(x, "renaissance")).join("");
    if (a) a.innerHTML = artworks.abstract.map(x => cardHTML(x, "abstract")).join("");
    if (m) m.innerHTML = artworks.modern.map(x => cardHTML(x, "modern")).join("");
    if (c) c.innerHTML = artworks.contemporary.map(x => cardHTML(x, "contemporary")).join("");
}

/* click -> artwork page (stores selected artwork in sessionStorage) */
function viewArtwork(id, collection) {
    const art = artworks[collection].find(x => x.id === id);
    if (!art) return;
    sessionStorage.setItem("selectedArtwork", JSON.stringify(art));
    // if artwork.html exists in your project, it will pick this up.
    window.location.href = "artwork.html";
}

/* slide buttons (left/right) behavior */
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".slide-btn");
    if (!btn) return;
    const targetId = btn.dataset.target;
    const target = document.getElementById(targetId);
    if (!target) return;
    const cardWidth = target.querySelector(".artwork-item") ? target.querySelector(".artwork-item").offsetWidth : 300;
    const gap = 18; // close to CSS gap
    const scrollAmount = Math.round(cardWidth + gap);
    if (btn.classList.contains("left")) {
        target.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
        target.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
});

/* featured slider auto-rotation */
let featuredIndex = 0;
function setupFeaturedSlider() {
    const container = document.getElementById("featuredSlider");
    if (!container) return;

    // clean container and append slides from a selection of artworks (mix of categories)
    const featuredList = [
        artworks.renaissance[3], // Last Supper
        artworks.renaissance[2], // School of Athens
        artworks.abstract[0],
        artworks.abstract[4],
        artworks.modern[2],
        artworks.modern[4],
        artworks.contemporary[0],
        artworks.contemporary[4]
    ].filter(Boolean);

    container.innerHTML = featuredList.map((a, i) => `
        <div class="featured-slide ${i === 0 ? 'active' : ''}">
            <img src="${a.image}" alt="${a.title}">
            <div class="featured-info"><h2>${a.title}</h2><p>${a.artist}</p></div>
        </div>
    `).join("");

    const slides = container.querySelectorAll(".featured-slide");
    if (!slides.length) return;

    setInterval(() => {
        featuredIndex = (featuredIndex + 1) % slides.length;
        slides.forEach(s => s.classList.remove("active"));
        slides[featuredIndex].classList.add("active");
    }, 3000);
}

/* nav-item click -> scroll behavior */
document.addEventListener("click", (e) => {
    const nav = e.target.closest(".nav-item");
    if (!nav) return;
    const target = document.getElementById(nav.dataset.target);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
});

/* highlight nav on scroll using IntersectionObserver */
function setupNavObserver() {
    const sections = [
        "popularSliderSection",
        "renaissanceSection",
        "abstractSection",
        "modernSection",
        "contemporarySection"
    ].map(id => document.getElementById(id)).filter(Boolean);

    const navItems = Array.from(document.querySelectorAll(".nav-item"));

    if (!sections.length || !navItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(n => n.classList.remove("active"));
                const selector = `.nav-item[data-target='${entry.target.id}']`;
                const active = document.querySelector(selector);
                if (active) active.classList.add("active");
            }
        });
    }, { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0.1 });

    sections.forEach(s => observer.observe(s));
}

/* optional: goHome / feedback functions */
function goHome() {
    // modify as needed
    window.location.href = "home_page.html";
}
function goToFeedback() {
    window.location.href = "feedback.html";
}

/* init everything when DOM is ready */
document.addEventListener("DOMContentLoaded", () => {
    renderArtSliders();
    setupFeaturedSlider();
    setupNavObserver();

    // wire header logo
    const logo = document.querySelector(".gallery-logo");
    if (logo) logo.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); });

    // small: add gallery-mode body class so styles adapt (we keep original slider dark background)
    document.body.classList.add("gallery-mode");
});
