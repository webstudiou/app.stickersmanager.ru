declare global {
  namespace ELEMENTS {
      type SIZE = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
      type SYSTEM_COLOR = 'primary' | 'success' | 'warning' | 'danger'
      type COLOR = SYSTEM_COLOR | 'blue' | 'red' | 'orange' | 'yellow' | 'green' | 'mint' | 'teal' | 'cyan' | 'indigo' | 'purple' | 'pink'
      type VARIANT = 'solid' | 'outline' | 'bezeled'
  }
}

export {}
