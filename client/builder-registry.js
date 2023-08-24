import dynamic from "next/dynamic";
import { builder, Builder } from '@builder.io/react'
import builderConfig from './builder.config'

builder.init(builderConfig.apiKey)


Builder.registerComponent(
    dynamic(() => import("./components/button/button")), {
    name: 'Button',
    inputs: [
        // 'name' is the name of your prop
        { name: 'content', type: 'text' },
        { name: 'link', type: 'url' },
    ],
})

Builder.registerComponent(
    dynamic(() => import("./components/catCarousel/catCarousel")), {
    name: 'CatCarousel',
})


