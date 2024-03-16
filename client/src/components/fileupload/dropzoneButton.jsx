import { useRef, useState } from "react";
import { Text, Group,rem, useMantineTheme } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";
import classes from "./DropzoneButton.module.css";

export function DropzoneButton() {
  const theme = useMantineTheme();
  const openRef = useRef(null);
  const [files, setFiles] = useState();

  return (
    <div className="border-dashed border-2 center flex-col border-gray-300 rounded py-4 w-full bg-[#efeefb] relative mb-7">
      <Dropzone
        openRef={openRef}
        onDrop={setFiles}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.pdf,MIME_TYPES.png]}
        maxSize={5 * 1024 ** 2}
      >
        <div style={{ pointerEvents: "none" }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload
                style={{ width: rem(50), height: rem(50) }}
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Group>
        </div>
        <Text ta="center" fw={700} fz="lg" mt="xl">
          <Dropzone.Accept>Drop files here</Dropzone.Accept>
          <Dropzone.Reject>Large file size</Dropzone.Reject>
          <Dropzone.Idle>Upload Your Certificate</Dropzone.Idle>
        </Text>

        <Text ta="center" fz="sm" mt="xs" c="dimmed">
          *file size should be less than 5mb
        </Text>
      </Dropzone>
    </div>
  );
}
