# BlockLoading

## Used

```
import { BlockLoading } from 'loading';

const props = {
  color: '#452f56',
  innerColor: '#ffd454',
  size: 'large'
}

<BlockLoading {...props} >{ children }</BlockLoading>
```


## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 加载状态 | Boolean | false |
| className | 选择器 className | String | '' |
| blur | 是否展示遮罩 | Boolean | true |
| color | 主题颜色 | String | `#1890ff` |
| innerColor | 内圈颜色 | String | `#ffd454` |
| size | 组件大小，可选值为 `small` `default` `large` | String | `default` |
