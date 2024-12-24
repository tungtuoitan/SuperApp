import { constants } from "../../constants";

export type SAModule = {
    id: string;
    name: string;
    code: string;
    componentCode: string;
    link: string;
    items?: SAComponent[];
    admin: boolean;
    hide: boolean;
    open: boolean | null | undefined;
    isPublic?: boolean | null | undefined;
    active: boolean;
    popup: boolean;
    hover: boolean;
    singleItem?: boolean | null | undefined;
    action?: string | null | undefined;
}

export type Breadcrumb = {
    name: string;
    link: string;
}

export type SAComponent = {
    id: string;
    name: string;
    code: string;
    componentCode: string;
    link: string;
    sub: boolean;
    isHide?: boolean | null | undefined;
    items?: SAComponent[] | undefined;
    active: boolean;
    isPublic?: boolean | null | undefined;
    action?: string | null | undefined;
}

let sitemapId = 1;
export const sitemaps = [
    { 
        id: (sitemapId++).toString(),
        name: 'HOME',
        code: 'home',
        link: '/home',
        open: false,
        isPublic: true,
        active: false,
        popup: false,
        hover: false,
    } as SAModule,

    {
        id: (sitemapId++).toString(),
        name: 'GENERAL',
        code: 'general',
        // link: '/general',
        componentCode: constants.accessRightsComponents.learnCSharp,
        admin: true,
        items: [
            {
              id: (sitemapId++).toString(),
              name: 'signup',
              code: 'signup',
              componentCode: constants.accessRightsComponents.finShark,
              link: '/signup',
              isPublic: true,
            } as SAComponent,
            {
              id: (sitemapId++).toString(),
              name: 'login',
              code: 'login',
              componentCode: constants.accessRightsComponents.finShark,
              link: '/login',
              isPublic: true,
            } as SAComponent,
            {
             
            } as SAComponent,
            {
                id: (sitemapId++).toString(),
                name: 'finShark',
                code: 'finShark',
                componentCode: constants.accessRightsComponents.finShark,
                link: '/finShark',
                isPublic: true,
            } as SAComponent,
           
        ],
        open: false,
        isPublic: true,
        active: false,
        popup: false,
        hover: false,
    } as SAModule,
    {
      id: (sitemapId++).toString(),
      name: 'Schedule',
      code: 'schedule',
      componentCode: constants.accessRightsComponents.nothing,
      link: '/schedule',
      isPublic: true,
  } as SAComponent,
] as SAModule[];

export const getBreadcrumbs = (link: string) => {
    let breadcrumbs: Breadcrumb[] = [{
        name: 'Home',
        link: '/home',
    }];
    let subItems: Breadcrumb[] = [];
    let found = false;
    const getComponents = (items: SAComponent[]) => {
        items.map(c => {
            if (c.link === link) {
                subItems.push({ name: c.name, link: '' });
                breadcrumbs = [...breadcrumbs, ...subItems];
                found = true;
            } if (c.sub && (c.items?.length ?? 0) > 0) {
                subItems.push({ name: c.name, link: c.link });
                console.log(c);
            }
            if (c.items && c.items.length > 0 && !found)
                getComponents(c.items);
            return c;
        });
    }

    sitemaps.map(s => {
        subItems = [];
        if (s?.items && s.items.length > 0 && !found)
            getComponents(s.items);
        return s;
    });
    return breadcrumbs;
}


