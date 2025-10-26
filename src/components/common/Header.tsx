import type { LucideIcon } from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

interface HeaderProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  badge?: string;
}

const Header: React.FC<HeaderProps> = ({
  icon: Icon,
  title,
  description,
  badge,
}) => (
  <div className="mb-6 space-y-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {description && (
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {badge && (
        <Badge variant="secondary" className="text-xs">
          {badge}
        </Badge>
      )}
    </div>
    <Separator />
  </div>
);

export default Header;
