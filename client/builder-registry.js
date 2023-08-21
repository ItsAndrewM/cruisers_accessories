import { Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

Builder.registerComponent(
    dynamic(() => import("./components/button/button")), {
    name: 'Button',
    inputs: [
        // 'name' is the name of your prop
        { name: 'content', type: 'text' },
        { name: 'link', type: 'url' },
    ],
}
)