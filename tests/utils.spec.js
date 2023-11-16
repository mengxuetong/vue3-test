import { createEle } from '@/utils/createEle'

test('utils:createEle', function() {
    expect(createEle({
        "tag": "ul",
        "props": {
            "class": "flex-center"
        },
        "children": [
            {
                "tag": "li",
                "props": {
                    "class": "text-center"
                },
                "children": "text 文本"
            }
        ]
    })).toBe('<ul class="flex-center"><li class="text-center">text 文本</li></ul>')
})