import { builder, Builder } from '@builder.io/react'

export const restrictedRegister = (
  component,
  options,
  models
) => {
  if (!Builder.isEditing || models.includes(builder.editingModel)) {
    return Builder.registerComponent(component, options)
  }
}
