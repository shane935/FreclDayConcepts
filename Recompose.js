//This is pseudo code

const MapProps = (props) => (BaseComponent) => {
  return React.createComponent(BaseComponent, props)
};

const WithProps = (userProps) => (BaseComponent) => {
  return React.createComponent(BaseComponent, {
    ...BaseComponent.props,
    ...userProps
  })
};

