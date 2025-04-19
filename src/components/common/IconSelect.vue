<script setup lang="ts">
import { mapEntries } from 'radash'

interface Props {
  disabled?: boolean
}

const {
  disabled = false,
} = defineProps<Props>()

interface IconList {
  prefix: string
  icons: string[]
  title: string
  total: number
  categories: Record<string, string[]>
}
const value = defineModel('value', { type: String })

// 包含的图标库系列名
const nameList = ['icon-park-outline', 'carbon']

// 获取单个图标库数据
async function fetchIconList(name: string): Promise<IconList> {
  return await fetch(`https://api.iconify.design/collection?prefix=${name}`).then(res => res.json())
}

// 获取所有图标库数据
async function fetchIconAllList(nameList: string[]) {
  const namePromises = nameList.map(name => fetchIconList(name))
  const targets = await Promise.all(namePromises)

  return targets.map((i) => {
    i.icons = Object.entries(i.categories).reduce((prev, next) => {
      const [_key, value] = next
      return prev.concat(value)
    }, [] as string[])
    return i
  })
}
// 获取svg文件名
function getSvgName(path: string) {
  const regex = /\/([^/]+)\.svg$/
  const match = path.match(regex)
  if (match) {
    const fileName = match[1]
    return fileName
  }
  return path
}

// 获取所有本地图标
function generateLocalIconList() {
  const localSvgList = import.meta.glob('@/assets/svg-icons/*.svg', {
    query: '?raw',
    import: 'default',
    eager: true,
  })

  return mapEntries(localSvgList, (key, value) => {
    return [getSvgName(key), value]
  })
}

const iconList = shallowRef<IconList[]>([])
const LocalIconList = shallowRef({})

onMounted(async () => {
  iconList.value = await fetchIconAllList(nameList)
  LocalIconList.value = generateLocalIconList()
})

// 当前tab
const currentTab = shallowRef(0)
// 当前tag
const currentTag = shallowRef('')

// 切换tab
function handleChangeTab(index: number) {
  currentTab.value = index
  currentTag.value = ''
}
// 搜索图标输入框值
const searchValue = ref('')

// 当前页数
const currentPage = shallowRef(1)

// 选择分类tag
function handleSelectIconTag(icon: string) {
  currentTag.value = currentTag.value === icon ? '' : icon
  currentPage.value = 1
}

// 包含当前分类或所有图标列表
const icons = computed(() => {
  const hasTag = !!currentTag.value
  if (hasTag)
    return iconList.value[currentTab.value]?.categories[currentTag.value]
  else
    return iconList.value[currentTab.value].icons
})

// 符合搜索条件的图标列表
const visibleIcons = computed(() => {
  return icons.value?.filter(i => i
    .includes(searchValue.value))?.slice((currentPage.value - 1) * 200, (currentPage.value) * 200)
})

const showModal = ref(false)

// 选择图标
function handleSelectIcon(icon: string) {
  value.value = icon
  showModal.value = false
}

// 清除图标
function clearIcon() {
  value.value = ''
  showModal.value = false
}
</script>

<template>
  <NInputGroup disabled>
    <NButton v-if="value" :disabled="disabled" type="primary">
      <template #icon>
        <IconLocal :icon="value" />
      </template>
    </NButton>
    <NInput :value="value" readonly :placeholder="$t('components.iconSelector.inputPlaceholder')" />
    <NButton type="primary" ghost :disabled="disabled" @click="showModal = true">
      {{ $t('common.choose') }}
    </NButton>
  </NInputGroup>
  <NModal
    v-model:show="showModal" preset="card" :title="$t('components.iconSelector.selectorTitle')" size="small" class="w-800px" :bordered="false"
  >
    <template #header-extra>
      <NButton type="warning" size="small" ghost @click="clearIcon">
        {{ $t('components.iconSelector.clearIcon') }}
      </NButton>
    </template>

    <NTabs :value="currentTab" type="line" animated placement="left" @update:value="handleChangeTab">
      <NTabPane name="local" tab="local">
        <NFlex :size="2">
          <NEl
            v-for="(_icon, key) in LocalIconList" :key="key"
            class="hover:(text-[var(--primary-color)] ring-1) ring-[var(--primary-color)] p-1 rounded flex-center"
            :title="`local:${key}`"
            @click="handleSelectIcon(`local:${key}`)"
          >
            <IconLocal :icon="`local:${key}`" :size="24" />
          </NEl>
        </NFlex>
      </NTabPane>
      <NTabPane v-for="(list, index) in iconList" :key="list.prefix" :name="index" :tab="list.title">
        <NFlex vertical>
          <NFlex size="small">
            <NTag
              v-for="(_v, k) in list.categories" :key="k"
              :checked="currentTag === k" round checkable size="small"
              @update:checked="handleSelectIconTag(k)"
            >
              {{ k }}
            </NTag>
          </NFlex>

          <NInput
            v-model:value="searchValue" type="text" clearable
            :placeholder="$t('components.iconSelector.searchPlaceholder')"
          />

          <div>
            <NFlex :size="2">
              <NEl
                v-for="(icon) in visibleIcons" :key="icon"
                class="hover:(text-[var(--primary-color)] ring-1) ring-[var(--primary-color)] p-1 rounded flex-center"
                :title="`${list.prefix}:${icon}`"
                @click="handleSelectIcon(`${list.prefix}:${icon}`)"
              >
                <IconLocal :icon="`${list.prefix}:${icon}`" :size="24" />
              </NEl>
              <NEmpty v-if="visibleIcons.length === 0" class="w-full" />
            </NFlex>
          </div>

          <NFlex justify="center">
            <NPagination
              v-model:page="currentPage"
              :item-count="icons?.length"
              :page-size="200"
            />
          </NFlex>
        </NFlex>
      </NTabPane>
    </NTabs>
  </NModal>
</template>
