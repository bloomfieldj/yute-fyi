import { styled } from "stitches.config";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import React from "react";
import { Menu, MenuList, MenuTrigger, MenuSubtitle, Span } from "./Menu";
import { ContentList, MenuContent } from "./Content";
import ContentListItem from "./Content";
import NextMenuLink from "./Links";
import Viewport from "./Viewport";
import Indicator from "./Indicator";
import { navItems } from "../NavData";

const MenuItem = styled(NavigationMenu.Item, {});

const DesktopNav = () => {
  return (
    <Menu orientation="horizontal">
      <MenuList>
        {navItems.map((item) => {
          return (
            <MenuItem key={item.title}>
              <MenuTrigger
              // aria-label={`Browse ${item.title}`}
              >
                <Span>{item.title}</Span>
              </MenuTrigger>
              <MenuContent>
                <MenuSubtitle>{item.subtitle}</MenuSubtitle>
                <ContentList>
                  {item.content.map((content) => {
                    return (
                      <ContentListItem key={content.title}>
                        <NextMenuLink
                          href={content.href}
                          title={content.title}
                          description={content.description}
                          ages={item.title}
                        />
                      </ContentListItem>
                    );
                  })}
                </ContentList>
              </MenuContent>
            </MenuItem>
          );
        })}
        <Indicator />
      </MenuList>
      <Viewport />
    </Menu>
  );
};

export default DesktopNav;
