import Image from "next/image"
import { useContext, ReactNode } from "react"
import { FiHeadphones, FiVideo, FiDownload, FiImage, FiFile } from "react-icons/fi"
import { AttachmentAPI, getIpfsUrl } from "lib/brain"
import styles from "./index.module.css"
import MediaContext from "lib/media-context"

interface AttachmentProps {
    data: AttachmentAPI
    small?: boolean
}

interface PreviewProps extends AttachmentProps {
    icon: ReactNode
}

export function Attachment({data, small}: AttachmentProps) {
    return (
        <div>
            <AttachmentParser data={data} small={small} />
            <Metadata data={data} small={small} />
        </div>
    )
}

function AttachmentParser({data, small}: AttachmentProps) {
    // Image
    if (data.mimetype.startsWith("image"))
        return <Preview data={data} small={small} icon={<FiImage />} />
    
    // Audio
    if (data.mimetype.startsWith("audio") || data.mimetype === "application/octet-stream")
        return <Preview data={data} small={small} icon={<FiHeadphones />} />
    
    // Video
    if (data.mimetype.startsWith("video"))
        return <Preview data={data} small={small} icon={<FiVideo />} />
    
    // Anything else
    return <Preview data={data} small={small} icon={<FiFile />} />
}

function Preview({data, small, icon}: PreviewProps) {
    const { setAid } = useContext(MediaContext)
    const className = small ? styles.smallPlaceholder : styles.placeholder
    
    // Returns the preview if it exists,
    // otherwise the fallback icon.
    const getContent = () => {
        if (data.preview) return (
            <Image
                src={getIpfsUrl(data.preview.cid)}
                sizes="100px"
                alt={`${data.name} - Preview`}
                fill
            />
        )
        return icon
    }

    return (
        <div className={className} onClick={() => setAid(data.id)}>
            {getContent()}
        </div>
    )
}

function Metadata({data, small}: AttachmentProps) {
    if (small) return <></>

    return (
        <div className={styles.metadata}>
            <a href={getIpfsUrl(data.cid)} target="_blank" rel="noreferrer">
                <button>
                    <FiDownload />
                </button>
            </a>
            <div>{data.name}</div>
        </div>
    )
}
