# DoubleLoading

## Usage

```
import { DoubleLoading } from 'loading';

const props = {
  value: ['(', ')'],
  size: 'large',
  color: '#452f56'
}

<DoubleLoading {...props} >{ children }</DoubleLoading>
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 加载状态 | Boolean | false |
| className | 选择器 className | String | 无 |
| blur | 是否展示遮罩 | Boolean | true |
| value | 自定义文案 | Array | ['{', '}'] |
| size | 组件大小，可选值为 `small` `default` `large` | String | `default` |
| color | 主题颜色 | String | `#1890ff` |