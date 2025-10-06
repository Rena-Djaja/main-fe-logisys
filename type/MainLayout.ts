import React, {ForwardRefExoticComponent, RefAttributes} from "react";
import {Sidebar} from "@/components/shared/ui/sidebar";
import {LucideProps} from "lucide-react";

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  menu: MenuListProps[];
}

export interface MenuListProps {
  title: string;
  menuItems: MenuItemProps[];
}

export interface MenuItemProps {
  title: string;
  url?: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  children?: ChildMenuItemProps[];
}

export interface ChildMenuItemProps {
  title: string;
  url: string;
}