rm(list = ls())

library("ggplot2")
theme_set(bw())
library("sf")
library("rgeos")
library("grid")


library("rnaturalearth")
library("rnaturalearthdata")

world <- ne_countries(scale = "medium", returnclass = "sf")
class(world)

## [1] "sf"  
## [1] "data.frame"


ggplot(data = world) +
  theme(panel.background = element_rect(fill = "#65728a"),
        plot.margin = unit(c(0, 0, 0, 0), "in"))+
  geom_sf(color = "#141f36", fill = "#3d547d")

ggsave("map_web.png", width = 400, height = 225, dpi = "screen", limitsize = FALSE)
