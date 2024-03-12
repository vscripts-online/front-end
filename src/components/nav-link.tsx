import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  text: string;
}

export default function NavLink(props: NavLinkProps) {
  const { to, text } = props;

  return (
    <NavigationMenuItem>
      <Link to={to}>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {text}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}
