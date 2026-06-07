import React from 'react';
import { 
  BookMarked, 
  Sparkles, 
  Palette, 
  Compass, 
  Search, 
  ArrowUpRight, 
  Mail, 
  ShoppingBag, 
  Check, 
  Heart, 
  MapPin, 
  Star, 
  User, 
  RefreshCw, 
  Award, 
  Info,
  ChevronRight,
  Filter,
  CheckCircle,
  HelpCircle,
  X
} from 'lucide-react';

const iconMap = {
  BookMarked,
  Sparkles,
  Palette,
  Compass,
  Search,
  ArrowUpRight,
  Mail,
  ShoppingBag,
  Check,
  Heart,
  MapPin,
  Star,
  User,
  RefreshCw,
  Award,
  Info,
  ChevronRight,
  Filter,
  CheckCircle,
  HelpCircle,
  X
};

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
  key?: React.Key;
}

export function LucideIcon({ name, className = '', size = 20 }: LucideIconProps) {
  const IconComponent = iconMap[name as keyof typeof iconMap];
  if (!IconComponent) {
    return <BookMarked className={className} size={size} />;
  }
  return <IconComponent className={className} size={size} />;
}
