import classNames from "classnames/bind"
import { useDispatch, useSelector } from "react-redux"

import styles from "../Header.module.scss"

import { updateUserRole } from "@/apis/authApi"
import { AppDispatch, RootState } from "@/redux/store"
import { updateRole } from "@/redux/slice/AuthSlice"

const cx = classNames.bind(styles)

type UpdateRoleProps = {
    setClose: Function,
}

function UpdateRole({ setClose }: UpdateRoleProps) {
    const dispatch: AppDispatch = useDispatch()
    const userIdToken = useSelector((state: RootState) => state.authSlice.accessToken)

    const handleOutForm = () => {
        setClose(false)
    }
    const handleInForm = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
    }

    const handleUpdateRole = async () => {
        try {
            await updateUserRole(userIdToken)
            dispatch(updateRole('artist'))
            setClose(false)
        } catch(err) {
            console.log('Update role failed: ', err)
        }
    }

    return (
        <div className={cx('confirm-form')} onClick={handleOutForm}>
            <div className={cx('form-container')} onClick={(e) => handleInForm(e)}>
                <p className={cx('title')}>---- You want to become an artist ? ----</p>
                
                <div className={cx('action')}>
                    <span className={cx('cancel')} onClick={() => setClose(false)}>Cancel</span>
                    <span className={cx('confirm')} onClick={handleUpdateRole}>Confirm</span>
                </div>
            </div>
        </div>
    )
}

export default UpdateRole