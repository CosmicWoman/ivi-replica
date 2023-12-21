import { Children, FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Icons from "../../Icons/Icons";
interface IInfiniteCarouselProps {
	children: any
	block: any
};

export const InfiniteCarousel: FC<IInfiniteCarouselProps> = ({ children, block }) => {
	const [current, setCurrent] = useState<number>(1)

	const [translateX, setTranslateX] = useState<number>(0)

	const [sliderItems, setSliderItems] = useState<any>([])
	const [x1, setX1] = useState<number | null>(null)
	const [y1, setY1] = useState<number | null>(null)

	const el = useRef<any>(null)
	const slider = useRef<any>(null)
	const interval = useRef<any>(null)
	const childWidthRef = useRef<any>(null)

	const handleTouchStart = (e: any) => {
		const firstTouch = e.touches[0]
		setX1(firstTouch.clientX)
		setY1(firstTouch.clientY)
	}

	const handleTouchMove = (e: any) => {
		if (!x1 || !y1) {
			return false
		}
		let x2 = e.touches[0].clientX
		let y2 = e.touches[0].clientY
		let xDiff = x2 - x1
		let yDiff = y2 - y1
		if (Math.abs(xDiff) > Math.abs(yDiff)) {
			if (xDiff > 5) {
				actionHandler('prev')
			}
			if (xDiff < -5) {
				actionHandler('next')
			}
		}
		setX1(null)
		setY1(null)
	}


	const addActiveClass = (type: string) => {
		for (let i = 0; i < sliderItems.length; i++) {
			sliderItems[i].classList.remove("carousel__slider-item_active");
		}
		if (sliderItems[current]) {

			if (type === 'prev') {
				sliderItems[current].classList.add("carousel__slider-item_active")
				if (current === 1) {
					sliderItems[current + children.length].classList.add("carousel__slider-item_active")
				}
			} else {
				if (current === children.length) {
					sliderItems[2].classList.add("carousel__slider-item_active")

				}
				sliderItems[current + 2].classList.add("carousel__slider-item_active")
			}
		}

	}

	const actionHandler = useCallback((mode: string) => {
		slider.current.style.transitionDuration = '600ms'
		if (mode === 'prev') {
			if (current <= 1) {
				setTranslateX(0)
				setCurrent(children.length)
				addActiveClass('prev')
			} else {
				setTranslateX(childWidthRef.current.clientWidth * (current - 1))
				setCurrent((prev: any) => --prev)
				addActiveClass('prev')
			}

		} else if (mode === 'next') {
			if (current === children.length) {
				setCurrent(1)
				setTranslateX(childWidthRef.current.clientWidth * (children.length + 1))
				addActiveClass('next')

			} else {
				setTranslateX((childWidthRef.current.clientWidth) * (current + 1))
				setCurrent((prev: any) => ++prev)
				addActiveClass('next')
			}
		}
	}, [current, children, sliderItems])

	useEffect(() => {
		setSliderItems(document.querySelectorAll('.carousel__slider-item'))
		document.querySelectorAll('.carousel__slider-item')[current + 1]?.classList.add('carousel__slider-item_active')

		setTranslateX(childWidthRef.current.clientWidth)

	}, [])

	// Для бесконечной прокрутки
	useEffect(() => {
		const transitionEnd = () => {
			if (slider.current) {
				if (current === 1 && el.current !== null) {
					slider.current.style.transitionDuration = '0ms'
					setTranslateX((childWidthRef.current.clientWidth * current))
				}

				if (current === children.length) {
					slider.current.style.transitionDuration = '0ms'
					setTranslateX(childWidthRef.current.clientWidth * children.length)
				}
			}

		}
		document.addEventListener('transitionend', transitionEnd)

		return () => {
			document.removeEventListener('transitionend', transitionEnd)
		}

	}, [current, children])


	// Автоматический скролл
	useEffect(() => {
		if (slider.current) {
			if (interval.current) {
				clearInterval(interval.current)
			}
			interval.current = setInterval(() => {
				actionHandler('next')
			}, 5000)
			return () => {
				if (interval.current) {
					clearInterval(interval.current)
				}
			}
		}
	}, [actionHandler])

	const slides: any | Element[] = useMemo(() => {
		if (children.length > 1) {
			let items = Children.map(children, (child, index) => (
				<div ref={childWidthRef} className="carousel__slider-item" key={index}>{child}</div>
			))
			return [
				<div className="carousel__slider-item" key={children.length + 5}>{children[children.length - 2]}</div>,
				<div className="carousel__slider-item" key={children.length + 1}>{children[children.length - 1]}</div>,
				...items,
				<div className="carousel__slider-item" key={children.length + 2}>{children[0]}</div>,
				<div className="carousel__slider-item" key={children.length + 3}>{children[1]}</div>
			]
		}

		return (
			<div >{children[0]}</div>
		)
	}, [children])


	return (

		<div
			ref={el}
			className='carousel__slider-container'
		>
			<div
				className="carousel__prev-arrow"
				onClick={() => actionHandler('prev')}
				style={{ left: 'calc(44vw - 550px)' }}
			>
				<Icons
					name="arrowLeft"
					size={'30'}
					color="rgba(255, 255, 255, 0.7)"
					className='carousel__prev-arrow_icon'
				/>
			</div>
			<div
				className="carousel__next-arrow"
				onClick={() => actionHandler('next')}
				style={{ right: 'calc(43vw - 550px)' }}
			>
				<Icons
					name="arrowRight"
					size={'30'}
					color="rgba(255, 255, 255, 0.7)"
					className='carousel__prev-arrow_icon'
				/>
			</div>
			<div
				className="carousel__slider"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				ref={slider}
				style={{ transform: `translate3d(${-translateX}px, 0, 0)` }}
			>

				{slides}
			</div>
		</div>
	);
}
