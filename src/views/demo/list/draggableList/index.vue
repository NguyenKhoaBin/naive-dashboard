<script setup lang="tsx">
import type { DataTableColumns, FormInst, NDataTable } from 'naive-ui'
import { Gender } from '@/constants'
import { useBoolean } from '@/hooks'
import { useTableDrag } from '@/hooks/useTableDrag'
import { fetchUserPage } from '@/service'
import { NButton, NPopconfirm, NSpace, NSwitch, NTag } from 'naive-ui'

const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

const initialModel = {
  condition_1: '',
  condition_2: '',
  condition_3: '',
  condition_4: '',
}
const model = ref({ ...initialModel })

const formRef = ref<FormInst | null>()
function sendMail(id?: number) {
  window.$message.success(`Xóa người dùng có id: ${id}`)
}
const columns: DataTableColumns<Entity.User> = [
  {
    title: 'Họ và tên',
    align: 'center',
    key: 'userName',
  },
  {
    title: 'Tuổi',
    align: 'center',
    key: 'age',
  },
  {
    title: 'Giới tính',
    align: 'center',
    key: 'gender',
    render: (row) => {
      const tagType = {
        0: 'primary',
        1: 'success',
      } as const
      if (row.gender) {
        return (
          <NTag type={tagType[row.gender]}>
            {Gender[row.gender]}
          </NTag>
        )
      }
    },
  },
  {
    title: 'Email',
    align: 'center',
    key: 'email',
  },
  {
    title: 'Trạng thái',
    align: 'center',
    key: 'status',
    render: (row) => {
      return (
        <NSwitch
          value={row.status}
          checked-value={1}
          unchecked-value={0}
          onUpdateValue={(value: 0 | 1) =>
            handleUpdateDisabled(value, row.id!)}
        >
          {{ checked: () => 'Kích hoạt', unchecked: () => 'Vô hiệu hóa' }}
        </NSwitch>
      )
    },
  },
  {
    title: 'Hành động',
    align: 'center',
    key: 'actions',
    render: (row) => {
      return (
        <NSpace justify="center">
          <NPopconfirm onPositiveClick={() => sendMail(row.id)}>
            {{
              default: () => 'Xác nhận xóa',
              trigger: () => <NButton size="small">Xóa</NButton>,
            }}
          </NPopconfirm>
        </NSpace>
      )
    },
  },
]

const listData = ref<Entity.User[]>([])
function handleUpdateDisabled(value: 0 | 1, id: number) {
  const index = listData.value.findIndex(item => item.id === id)
  if (index > -1)
    listData.value[index].status = value
}

const tableRef = ref<InstanceType<typeof NDataTable>>()
useTableDrag({
  tableRef,
  data: listData,
  onRowDrag(data) {
    const target = data[data.length - 1]
    window.$message.success(`Kéo thả dữ liệu id: ${target.id} tên: ${target.userName}`)
  },
})

onMounted(() => {
  getUserList()
})
async function getUserList() {
  startLoading()
  await fetchUserPage().then((res: any) => {
    listData.value = res.data.list
    endLoading()
  })
}
function changePage(page: number, size: number) {
  window.$message.success(`Phân trang: ${page}, ${size}`)
}
function handleResetSearch() {
  model.value = { ...initialModel }
}
</script>

<template>
  <NSpace vertical size="large">
    <NCard>
      <NForm ref="formRef" :model="model" label-placement="left" inline :show-feedback="false">
        <NFlex>
          <NFormItem label="Họ và tên" path="condition_1">
            <NInput v-model:value="model.condition_1" placeholder="Nhập họ và tên" />
          </NFormItem>
          <NFormItem label="Tuổi" path="condition_2">
            <NInput v-model:value="model.condition_2" placeholder="Nhập tuổi" />
          </NFormItem>
          <NFormItem label="Giới tính" path="condition_3">
            <NInput v-model:value="model.condition_3" placeholder="Nhập giới tính" />
          </NFormItem>
          <NFormItem label="Địa chỉ" path="condition_4">
            <NInput v-model:value="model.condition_4" placeholder="Nhập địa chỉ" />
          </NFormItem>
          <NFlex class="ml-auto">
            <NButton type="primary" @click="getUserList">
              <template #icon>
                <IconParkOutlineSearch />
              </template>
              Tìm kiếm
            </NButton>
            <NButton strong secondary @click="handleResetSearch">
              <template #icon>
                <IconParkOutlineRedo />
              </template>
              Đặt lại
            </NButton>
          </NFlex>
        </NFlex>
      </NForm>
    </NCard>
    <NCard>
      <NSpace vertical size="large">
        <NDataTable
          ref="tableRef"
          row-class-name="drag-handle"
          :columns="columns"
          :data="listData"
          :loading="loading"
          :scroll-x="1240"
        />
        <Pagination :count="100" @change="changePage" />
      </NSpace>
    </NCard>
  </NSpace>
</template>
