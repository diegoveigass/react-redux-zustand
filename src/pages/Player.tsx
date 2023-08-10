import { ChevronDown, MessageCircle } from 'lucide-react'
import { Header } from '../components/Header'
import { Video } from '../components/Video'
import { Module } from '../components/Module'
import { useEffect } from 'react'
import { Lesson } from '../components/Lesson'
import { useCurrentLesson, useStore } from '../zustand-store'

export function Player() {
  const { course, load, isLoading } = useStore((state) => {
    return {
      course: state.course,
      load: state.load,
      isLoading: state.isLoading,
    }
  })

  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`
    }
  }, [currentLesson])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>
        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-sm pr-80">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="absolute top-0 bottom-0 right-0 w-80 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {!isLoading && course?.modules ? (
              course.modules.map((module, index) => (
                <Module
                  key={module.id}
                  moduleIndex={index}
                  title={module.title}
                  amountOfLessons={module.lessons.length}
                />
              ))
            ) : (
              <div className="group animate-pulse">
                <div className="flex w-full items-center gap-3 bg-zinc-800 p-4">
                  <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-700 text-xs"></div>
                  <div className="flex flex-col gap-1 text-left">
                    <strong className="h-4 w-5 flex-1 bg-zinc-700 rounded-md text-zinc-700"></strong>
                    <span className="h-3 w-5 bg-zinc-700 text-zinc-700 rounded-md"></span>
                  </div>

                  <ChevronDown className="h-5 w-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
                </div>

                <div>
                  <nav className="relative flex flex-col gap-4 p-6">
                    {Array(4).map((_, index) => (
                      <Lesson
                        key={index}
                        title=""
                        duration=""
                        onPlay={() => {}}
                        isCurrent={true}
                      />
                    ))}
                  </nav>
                </div>
              </div>
            )}
          </aside>
        </main>
      </div>
    </div>
  )
}
