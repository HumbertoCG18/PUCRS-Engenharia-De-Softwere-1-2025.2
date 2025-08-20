import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, BarChart3, User } from 'lucide-react';

const NavItem = ({ to, icon: Icon, label }) => {
  const baseStyle = "flex flex-col items-center justify-center w-full pt-2 pb-1 text-gray-400 hover:text-blue-400 transition-colors";
  const activeStyle = "!text-blue-500";

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : ''}`}
    >
      <Icon size={24} />
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900 border-t border-gray-700 flex md:hidden shadow-lg">
      <NavItem to="/" icon={Home} label="Início" />
      <NavItem to="/game" icon={ClipboardList} label="Simulação" />
      <NavItem to="/stats" icon={BarChart3} label="Estatísticas" />
      <NavItem to="/profile" icon={User} label="Perfil" />
    </nav>
  );
}

export default BottomNav;