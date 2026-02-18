"use client";

import { useState } from "react";
import LinkButton from "@/ui/LinkButton";
import { PiPlusCircleDuotone } from "react-icons/pi";
import InputRow from "@/ui/InputRow";

export type CustomContentItem = {
  title: string;
  caption: string;
};

interface CustomContentFormProps {
  initialItems?: CustomContentItem[];
  onSave?: (items: CustomContentItem[]) => void;
}

function CustomContentForm({ initialItems = [] }: CustomContentFormProps) {
  const [items, setItems] = useState<CustomContentItem[]>(initialItems);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<CustomContentItem>({
    title: "",
    caption: "",
  });

  const handleAdd = () => {
    if (newItem.title.trim() && newItem.caption.trim()) {
      setItems([...items, { ...newItem }]);
      setNewItem({ title: "", caption: "" });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-stone-700">محتوای سفارشی</h3>
        {!isAdding && (
          <LinkButton onClick={() => setIsAdding(true)}>
            <span className="*:size-5">
              <PiPlusCircleDuotone />
            </span>
            <span>افزودن</span>
          </LinkButton>
        )}
      </div>

      {/* Add New Item Form */}
      {isAdding && (
        <div className="p-5 bg-stone-50 rounded-xl border-2 border-dashed border-primary/30">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                عنوان <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newItem.title}
                onChange={(e) =>
                  setNewItem({ ...newItem, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
                placeholder="مثال: معرفی"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                متن <span className="text-red-500">*</span>
              </label>
              <textarea
                value={newItem.caption}
                onChange={(e) =>
                  setNewItem({ ...newItem, caption: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none bg-white"
                placeholder="متن توضیحات..."
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <LinkButton
                onClick={() => {
                  setIsAdding(false);
                  setNewItem({ title: "", caption: "" });
                }}
                variation="btn-danger"
              >
                انصراف
              </LinkButton>
              <LinkButton
                disabled={!newItem.title.trim() || !newItem.caption.trim()}
                onClick={handleAdd}
                variation="btn-primary"
              >
                افزودن
              </LinkButton>
            </div>
          </div>
        </div>
      )}

      {/* Items List */}
      {items.length === 0 ? (
        <div className="text-center py-6 text-stone-500">
          <p className="text-sm">هیچ محتوای سفارشی اضافه نشده است</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-stone-50 rounded-xl border border-stone-200 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 flex flex-col gap-2">
                    <InputRow label="عنوان">
                      <input
                        className="input-light"
                        defaultValue={item.title}
                        name={`section-${index + 1}`}
                      />
                    </InputRow>
                    <InputRow label="توضیحات">
                      <textarea
                        className="input-light"
                        name={`section-${index + 1}`}
                        defaultValue={item.caption}
                      ></textarea>
                    </InputRow>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* JSON Preview (for debugging) */}
      {items.length > 0 && (
        <details className="bg-stone-50 rounded-lg p-3 border border-stone-200">
          <summary className="text-sm font-medium text-stone-600 cursor-pointer">
            پیش‌نمایش داده (JSON)
          </summary>
          <pre className="text-xs bg-white p-3 rounded border border-stone-200 overflow-x-auto mt-2">
            {JSON.stringify(items, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}

export default CustomContentForm;
