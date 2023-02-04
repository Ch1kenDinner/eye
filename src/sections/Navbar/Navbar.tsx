import React, {DetailedHTMLProps, HTMLAttributes} from 'react'
import s from './Navbar.module.scss'
import {SiPlayerdotme} from 'react-icons/si'
import Search from '../../components/Search/Search'
import { DP } from '../../common/types'
import classNames from 'classnames'

const Navbar = ({className}: DP) => {
	return (
    <section className={classNames(s.main, className)}>
      <div className={s.logo}>
        <SiPlayerdotme />
        <span>Eye</span>
      </div>
      <Search />
    </section>
  );
}

export default Navbar