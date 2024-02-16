import {
  ActionIcon,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
} from "@mantine/core"
import { IconChevronDown, IconTrash } from "@tabler/icons-react"

const JoinedMenu = () => {
  return (
    <Menu position="bottom-end" shadow="md">
      <MenuTarget>
        <ActionIcon
          aria-label="詳細メニューを開く"
          color="gray"
          p={4}
          radius="50%"
          size="lg"
          variant="subtle"
        >
          <IconChevronDown stroke={1.5} />
        </ActionIcon>
      </MenuTarget>
      <MenuDropdown>
        <MenuItem color="red" leftSection={<IconTrash stroke={1} />}>
          削除する
        </MenuItem>
      </MenuDropdown>
    </Menu>
  )
}

export default JoinedMenu
