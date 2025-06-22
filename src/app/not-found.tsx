import Link from 'next/link';
import cls from './styles/notFound.module.scss';

export default function NotFound() {
    return (
        <div className={cls.notFound}>
            <h2 className={cls.description}>Not Found</h2>
            <p className={cls.text}>*Could not find requested resource</p>
            <Link className={cls.link} href="/">
                Return Home
            </Link>
        </div>
    );
}
