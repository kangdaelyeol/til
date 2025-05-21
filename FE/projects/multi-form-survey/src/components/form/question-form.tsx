import { Controller, useFormContext } from 'react-hook-form'
import type Question from '../../models/question'
import Input from '../common/input'
import Dropdown from '../common/dropdown'
import Textarea, { AutoGrow } from '../common/textarea'
import Radio from '../common/radio'
import Checkbox from '../common/checkbox'

interface Props {
    question: Question
}

export default function QuestionForm({ question }: Props) {
    const { register, control } = useFormContext()
    switch (question.type) {
        case 'shortText':
            return (
                <Input
                    className="pb-[16px] pt-0 border-b-[2px] focus:border-b-main focus:bg-transparent w-full"
                    {...register(`${question.id}`, {
                        required: {
                            value: question.required,
                            message: '필수 항목 입니다',
                        },
                    })}
                />
            )
        case 'date':
            return (
                <Input
                    type="date"
                    {...register(`${question.id}`, {
                        required: {
                            value: question.required,
                            message: '필수 항목 입니다',
                        },
                    })}
                />
            )
        case 'time':
            return (
                <Input
                    type="time"
                    {...register(`${question.id}`, {
                        required: {
                            value: question.required,
                            message: '필수 항목 입니다',
                        },
                    })}
                />
            )
        case 'dropdown':
            return (
                <Controller
                    name={`${question.id}`}
                    control={control}
                    render={({ field }) => (
                        <Dropdown
                            onChange={field.onChange}
                            options={question.options!.map((option) => ({
                                label: <span>{option}</span>,
                                value: option,
                            }))}
                        />
                    )}
                    rules={{ required: question.required }}
                />
            )
        case 'longText':
            return (
                <AutoGrow className="w-full" forTextarea={`${question.id}`}>
                    <Textarea
                        rows={1}
                        className="w-full focus:bg-transparent border-b-[2px] focus:border-b-main"
                        {...register(`${question.id}`, {
                            required: {
                                value: question.required,
                                message: '필수 항목 입니다',
                            },
                        })}
                    />
                </AutoGrow>
            )
        case 'multipleChoice':
            return (
                <div className="flex flex-col gap-y-[20px]">
                    {question.options!.map((option) => (
                        <Radio
                            key={option}
                            label={option}
                            value={option}
                            {...register(`${question.id}`, {
                                required: {
                                    value: question.required,
                                    message: '필수 항목 입니다',
                                },
                            })}
                        />
                    ))}
                </div>
            )
        case 'checkbox':
            return (
                <div className="flex flex-col gap-y-[20px]">
                    {question.options!.map((option) => (
                        <Checkbox
                            key={option}
                            label={option}
                            value={option}
                            {...register(`${question.id}`, {
                                required: {
                                    value: question.required,
                                    message: '필수 항목 입니다',
                                },
                            })}
                        />
                    ))}
                </div>
            )
        default:
            return null
    }
}
