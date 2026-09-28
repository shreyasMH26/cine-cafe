export interface MenuItem {
  id: string;
  name: string;
  description: string;
  emoji: string;
  comicWord: string;
  color: string; // tailwind gradient
}

export const menuItems: MenuItem[] = [
  {
    id: "fried-rice",
    name: "FRIED RICE",
    description: "Wok-tossed masala fried rice — smoky, spicy, and utterly heroic.",
    emoji: "🍚",
    comicWord: "CRUNCH!",
    color: "from-orange-900 to-red-900",
  },
  {
    id: "gobi",
    name: "GOBI",
    description: "Crispy cauliflower bites seasoned with bold spices. BOOM.",
    emoji: "🥦",
    comicWord: "POW!",
    color: "from-yellow-900 to-orange-900",
  },
  {
    id: "masala-soda",
    name: "MASALA SODA",
    description: "Fizzy, tangy, ice-cold masala soda. Your web-slinging fuel.",
    emoji: "🥤",
    comicWord: "WHOOSH!",
    color: "from-blue-900 to-cyan-900",
  },
  {
    id: "asian-salad",
    name: "ASIAN SALAD",
    description: "Fresh crunchy greens with an Asian kick. Light yet legendary.",
    emoji: "🥗",
    comicWord: "THWIP!",
    color: "from-green-900 to-emerald-900",
  },
  {
    id: "carrot-halwa",
    name: "CARROT HALWA",
    description: "Rich, warm carrot halwa — the sweetest finale to your mission.",
    emoji: "🥕",
    comicWord: "YUM!",
    color: "from-red-900 to-pink-900",
  },
];

export const MENU_URL = "https://cinecafe.teamdynamos.in";
