rm(list = ls())

library("ggplot2")
theme_set(theme_bw())
library("sf")
library("rgeos")


library("rnaturalearth")
library("rnaturalearthdata")

world <- ne_countries(scale = "medium", returnclass = "sf")
class(world)

## [1] "sf"  
## [1] "data.frame"

ggplot(data = world) +
  geom_sf()

ggsave("map_web.png", width = 160, height = 90, dpi = "screen", limitsize = FALSE)
