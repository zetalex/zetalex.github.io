import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Universidad Politécnica de Valencia - UPV": "https://www.upv.es/",
      "Microelectronics Master - Microprocessors": "https://nano.upv.es/",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      title: "Sections", // title of the explorer component
      folderClickBehavior: "collapse", // what happens when you click a folder ("link" to navigate to folder page on click or "collapse" to collapse folder on click)
      folderDefaultState: "collapsed", // default state of folders ("collapsed" or "open")
      useSavedState: true, // whether to use local storage to save "state" (which folders are opened) of explorer
      // omitted but shown later
      mapFn: (node) => {
        if (node.isFolder) {
          node.displayName = "📁 " + node.displayName
        } else {
          node.displayName = "📄 " + node.displayName
        }
      },
      sortFn: (a, b) => {
              // Define el orden personalizado en este array
          const customOrder = [
            "SESSION 1: MICROBLAZE PLATFORM FOR PETALINUX",
            "SESSION 2: SOFTWARE COMPONENTS OF PETALINUX",
            "EXTRA: Coding applications in Vitis Unified",
          ];

        const indexA = customOrder.indexOf(a.displayName);
        const indexB = customOrder.indexOf(b.displayName);

        console.log(a.displayName, indexA, b.displayName, indexB) 

        if (indexA === -1 && indexB === -1) {
            return a.displayName.localeCompare(b.displayName); // Orden alfabético si no están en la lista
        }
        if (indexA === -1) return 1; // Pone elementos desconocidos al final
        if (indexB === -1) return -1;
        
        return indexA - indexB; // Ordena según la lista
      },
      // what order to apply functions in
      order: ["filter", "sort", "map"],
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
