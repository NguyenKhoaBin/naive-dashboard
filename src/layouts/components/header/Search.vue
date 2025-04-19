<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { useRouteStore } from '@/store'

const routeStore = useRouteStore()

// Search value
const searchValue = ref('')

// Selected index
const selectedIndex = ref<number>(0)

const { bool: showModal, setTrue: openModal, setFalse: closeModal, toggle: toggleModal } = useBoolean(false)

// Toggle between mouse and keyboard to avoid conflicts
const { bool: keyboardFlag, setTrue: setKeyboardTrue, setFalse: setKeyboardFalse } = useBoolean(false)

const { ctrl_k, arrowup, arrowdown, enter/* keys to monitor */ } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 'k' && e.type === 'keydown')
      e.preventDefault()
  },
})

// Listen for global shortcuts
watchEffect(() => {
  if (ctrl_k.value)
    toggleModal()
})

const { t } = useI18n()

// Compute matching menu options
const options = computed(() => {
  if (!searchValue.value)
    return []

  return routeStore.rowRoutes.filter((item) => {
    const conditions = [
      t(`route.${String(item.name)}`, item.title || item.name)?.includes(searchValue.value),
      item.path?.includes(searchValue.value),
    ]
    return conditions.some(condition => !item.hide && condition)
  }).map((item) => {
    return {
      label: t(`route.${String(item.name)}`, item.title || item.name),
      value: item.path,
      icon: item.icon,
    }
  })
})

const router = useRouter()

// Close modal
function handleClose() {
  searchValue.value = ''
  selectedIndex.value = 0
  closeModal()
}

// Reset index when input value changes
function handleInputChange() {
  selectedIndex.value = 0
}

// Select a menu option
function handleSelect(value: string) {
  handleClose()
  router.push(value)
  nextTick(() => {
    searchValue.value = ''
  })
}

watchEffect(() => {
  // Do nothing if modal is not open or no search results
  if (!showModal.value || !options.value.length)
    return

  // Set keyboard operation flag to prevent mouseover from being triggered passively
  setKeyboardTrue()
  if (arrowup.value)
    handleArrowup()

  if (arrowdown.value)
    handleArrowdown()

  if (enter.value)
    handleEnter()
})

const scrollbarRef = ref()

// Arrow up key operation
function handleArrowup() {
  if (selectedIndex.value === 0)
    selectedIndex.value = options.value.length - 1

  else
    selectedIndex.value--

  handleScroll(selectedIndex.value)
}

// Arrow down key operation
function handleArrowdown() {
  if (selectedIndex.value === options.value.length - 1)
    selectedIndex.value = 0

  else
    selectedIndex.value++

  handleScroll(selectedIndex.value)
}

function handleScroll(currentIndex: number) {
  // Keep 6 options in the visible area, start scrolling after 6 options
  const keepIndex = 5
  // Height of one element, including spacing and container padding
  const elHeight = 70
  const distance = currentIndex * elHeight > keepIndex * elHeight ? currentIndex * elHeight - keepIndex * elHeight : 0
  scrollbarRef.value?.scrollTo({
    top: distance,
  })
}
// Enter key operation
function handleEnter() {
  const target = options.value[selectedIndex.value]
  if (target)
    handleSelect(target.value)
}

// Mouse enter operation
function handleMouseEnter(index: number) {
  if (keyboardFlag.value)
    return

  selectedIndex.value = index
}
</script>

<template>
  <CommonWrapper @click="openModal">
    <IconParkOutlineSearch /><NTag round size="small" class="font-mono cursor-pointer">
      CtrlK
    </NTag>
  </CommonWrapper>
  <NModal
    v-model:show="showModal"
    class="w-560px fixed top-60px inset-x-0"
    size="small"
    preset="card"
    :segmented="{
      content: true,
      footer: true,
    }"
    :closable="false"
    @after-leave="handleClose"
  >
    <template #header>
      <NInput v-model:value="searchValue" :placeholder="$t('app.searchPlaceholder')" clearable size="large" @input="handleInputChange">
        <template #prefix>
          <NIcon>
            <IconParkOutlineSearch />
          </NIcon>
        </template>
      </NInput>
    </template>
    <NScrollbar ref="scrollbarRef" class="h-450px">
      <ul
        v-if="options.length"
        class="flex flex-col gap-8px p-8px p-r-3"
      >
        <NEl
          v-for="(option, index) in options"
          :key="option.value" tag="li" role="option"
          class="cursor-pointer shadow h-62px"
          :class="{ 'text-[var(--base-color)] bg-[var(--primary-color-hover)]': index === selectedIndex }"
          @click="handleSelect(option.value)"
          @mouseenter="handleMouseEnter(index)"
          @mousemove="setKeyboardFalse"
        >
          <div class="grid grid-rows-2 grid-cols-[40px_1fr_30px] h-full p-2">
            <div class="row-span-2 place-self-center">
              <IconLocal :icon="option.icon" />
            </div>
            <span>{{ option.label }}</span>
            <IconParkOutlineRight class="row-span-2 place-self-center" />
            <span class="op-70">{{ option.value }}</span>
          </div>
        </NEl>
      </ul>

      <NEmpty v-else size="large" class="h-450px flex-center" />
    </NScrollbar>

    <template #footer>
      <NFlex>
        <div class="flex-y-center gap-1">
          <svg width="15" height="15" aria-label="Enter key" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3" /></g></svg>
          <span>{{ $t('common.choose') }}</span>
        </div>
        <div class="flex-y-center gap-1">
          <svg width="15" height="15" aria-label="Arrow down" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3" /></g></svg>
          <svg width="15" height="15" aria-label="Arrow up" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3" /></g></svg>
          <span>{{ $t('common.navigate') }}</span>
        </div>
        <div class="flex-y-center gap-1">
          <svg width="15" height="15" aria-label="Escape key" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956" /></g></svg>
          <span>{{ $t('common.close') }}</span>
        </div>
      </NFlex>
    </template>
  </NModal>
</template>
